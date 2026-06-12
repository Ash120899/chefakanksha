import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const db = await readDB();
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject: subject || 'General Collaboration Inquiry',
      message,
      date: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    db.messages = db.messages || [];
    db.messages.unshift(newMessage);
    await writeDB(db);

    // Read SMTP Configs
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT || 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || `"Chef Akanksha Website" <no-reply@chefakanksha.com>`;
    const to = process.env.CONTACT_RECEIVER || 'veganpiatto@gmail.com';

    let emailSent = false;
    let emailStatus = 'Logged to console (SMTP not configured)';

    if (host && user && pass) {
      try {
        const transporter = nodemailer.createTransport({
          host,
          port: parseInt(port, 10),
          secure: parseInt(port, 10) === 465,
          auth: { user, pass },
        });

        await transporter.sendMail({
          from,
          to,
          subject: `[Chef Akanksha] New Collaboration Inquiry: ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
              <h2 style="color: #7A9E6D; border-bottom: 2px solid #7A9E6D; padding-bottom: 10px;">New Contact Message</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Subject:</strong> ${subject}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p><strong>Message:</strong></p>
              <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap; font-style: italic;">${message}</p>
            </div>
          `,
        });

        emailSent = true;
        emailStatus = 'Sent successfully via SMTP';
      } catch (mailError) {
        console.error('SMTP Send Error:', mailError);
        emailStatus = `SMTP Error: ${mailError.message}`;
      }
    } else {
      console.log('=== NEW CONTACT FORM SUBMISSION ===');
      console.log(`To: ${to}`);
      console.log(`From: ${from}`);
      console.log(`Name: ${name}`);
      console.log(`Email: ${email}`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log('====================================');
    }

    return NextResponse.json({
      success: true,
      message: 'Message processed successfully',
      emailStatus,
    });
  } catch (error) {
    console.error('POST contact API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const db = await readDB();
    return NextResponse.json({ success: true, messages: db.messages || [] });
  } catch (error) {
    console.error('GET contact API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
