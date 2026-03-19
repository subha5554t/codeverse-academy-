import nodemailer from 'nodemailer'

// ── Create transporter ──────────────────────────────────────────────────────
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD, // Gmail App Password (16 chars)
    },
  })
}

// ── Email Templates ─────────────────────────────────────────────────────────

// 1. Alert email to admin (Subhadip) when someone fills contact form
export const sendContactAlertToAdmin = async ({ name, email, course, message }) => {
  const transporter = createTransporter()

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #050508; color: #F1F5F9; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 0 auto; padding: 32px 16px; }
        .card { background: #13131C; border: 1px solid #1C1C2E; border-radius: 16px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #6366F1, #22D3EE); padding: 28px 32px; }
        .header h1 { margin: 0; color: white; font-size: 22px; font-weight: 700; }
        .header p { margin: 6px 0 0; color: rgba(255,255,255,0.8); font-size: 14px; }
        .body { padding: 28px 32px; }
        .row { margin-bottom: 20px; }
        .label { font-size: 11px; font-weight: 600; color: #6366F1; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
        .value { font-size: 15px; color: #F1F5F9; background: #0D0D14; border: 1px solid #1C1C2E; border-radius: 8px; padding: 10px 14px; }
        .message-box { background: #0D0D14; border: 1px solid #1C1C2E; border-radius: 8px; padding: 14px; font-size: 14px; color: #94A3B8; line-height: 1.7; }
        .footer { background: #0D0D14; border-top: 1px solid #1C1C2E; padding: 18px 32px; text-align: center; }
        .footer p { margin: 0; font-size: 12px; color: #475569; }
        .badge { display: inline-block; background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3); color: #818CF8; border-radius: 20px; padding: 3px 10px; font-size: 12px; font-weight: 600; }
        .btn { display: inline-block; background: #6366F1; color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600; margin-top: 16px; }
        .dot { width: 8px; height: 8px; background: #34D399; border-radius: 50%; display: inline-block; margin-right: 6px; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="card">
          <div class="header">
            <h1>📬 New Contact Form Submission</h1>
            <p>Someone reached out via CodeVerse Academy</p>
          </div>
          <div class="body">
            <p style="color:#94A3B8; font-size:14px; margin-top:0;">
              <span class="dot"></span>
              Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </p>

            <div class="row">
              <div class="label">Full Name</div>
              <div class="value">${name}</div>
            </div>

            <div class="row">
              <div class="label">Email Address</div>
              <div class="value">
                <a href="mailto:${email}" style="color:#22D3EE; text-decoration:none;">${email}</a>
              </div>
            </div>

            <div class="row">
              <div class="label">Course Interest</div>
              <div class="value">
                ${course ? `<span class="badge">${course}</span>` : '<span style="color:#475569">Not specified</span>'}
              </div>
            </div>

            <div class="row">
              <div class="label">Message</div>
              <div class="message-box">${message.replace(/\n/g, '<br/>')}</div>
            </div>

            <a href="mailto:${email}?subject=Re: Your enquiry at CodeVerse Academy" class="btn">
              ✉️ Reply to ${name.split(' ')[0]}
            </a>
          </div>
          <div class="footer">
            <p>CodeVerse Academy · Purulia, West Bengal, India</p>
            <p style="margin-top:4px;">This alert was sent to subhadipmahanty@gmail.com</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  await transporter.sendMail({
    from: `"${process.env.EMAIL_FROM_NAME || 'CodeVerse Academy'}" <${process.env.EMAIL_FROM}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `📬 New Enquiry from ${name} — CodeVerse Academy`,
    html,
    replyTo: email,
  })
}

// 2. Auto-reply email to the person who contacted
export const sendContactAutoReply = async ({ name, email, course }) => {
  const transporter = createTransporter()

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #050508; color: #F1F5F9; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 0 auto; padding: 32px 16px; }
        .card { background: #13131C; border: 1px solid #1C1C2E; border-radius: 16px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #6366F1, #22D3EE); padding: 32px; text-align: center; }
        .logo { font-size: 28px; font-weight: 800; color: white; letter-spacing: -0.5px; }
        .tagline { color: rgba(255,255,255,0.8); font-size: 14px; margin-top: 6px; }
        .body { padding: 32px; }
        .greeting { font-size: 20px; font-weight: 700; color: #F1F5F9; margin-bottom: 12px; }
        p { font-size: 15px; color: #94A3B8; line-height: 1.7; margin: 0 0 16px; }
        .highlight { color: #6366F1; font-weight: 600; }
        .steps { background: #0D0D14; border: 1px solid #1C1C2E; border-radius: 12px; padding: 20px; margin: 20px 0; }
        .step { display: flex; align-items: flex-start; margin-bottom: 14px; }
        .step:last-child { margin-bottom: 0; }
        .step-num { background: #6366F1; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; margin-right: 12px; margin-top: 1px; }
        .step-text { font-size: 14px; color: #94A3B8; line-height: 1.5; }
        .btn { display: block; background: linear-gradient(135deg, #6366F1, #4F46E5); color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 15px; font-weight: 700; text-align: center; margin: 24px 0; }
        .contact-info { background: #0D0D14; border: 1px solid #1C1C2E; border-radius: 10px; padding: 16px 20px; font-size: 13px; color: #475569; }
        .contact-info a { color: #22D3EE; text-decoration: none; }
        .footer { background: #0D0D14; border-top: 1px solid #1C1C2E; padding: 18px 32px; text-align: center; }
        .footer p { margin: 0; font-size: 12px; color: #475569; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="card">
          <div class="header">
            <div class="logo">CodeVerse Academy</div>
            <div class="tagline">Master Modern Software Development</div>
          </div>
          <div class="body">
            <div class="greeting">Hey ${name.split(' ')[0]}! 👋</div>
            <p>Thanks for reaching out to CodeVerse Academy. We have received your message and <span class="highlight">will get back to you within 2 hours</span>.</p>

            ${course ? `<p>You showed interest in <span class="highlight">${course}</span> — great choice! Our advisor will reach out with detailed information about the curriculum, mentorship, and enrollment.</p>` : ''}

            <div class="steps">
              <p style="font-size:13px; font-weight:700; color:#F1F5F9; margin:0 0 14px; text-transform:uppercase; letter-spacing:0.5px;">What happens next</p>
              <div class="step">
                <div class="step-num">1</div>
                <div class="step-text">Our learning advisor reviews your message (within 2 hrs)</div>
              </div>
              <div class="step">
                <div class="step-num">2</div>
                <div class="step-text">You receive a personalised reply with course details and next steps</div>
              </div>
              <div class="step">
                <div class="step-num">3</div>
                <div class="step-text">Optional 30-minute free consultation call to find your perfect path</div>
              </div>
              <div class="step">
                <div class="step-num">4</div>
                <div class="step-text">Enroll and start learning — first week is completely free</div>
              </div>
            </div>

            <a href="http://localhost:3000/courses" class="btn">Browse All Courses →</a>

            <div class="contact-info">
              <strong style="color:#F1F5F9;">Direct contact</strong><br/>
              📧 <a href="mailto:subhadipmahanty@gmail.com">subhadipmahanty@gmail.com</a><br/>
              📍 Purulia, West Bengal, India
            </div>
          </div>
          <div class="footer">
            <p>© 2025 CodeVerse Academy · Built with ❤️ by Subhadip Mahanty</p>
            <p style="margin-top:4px;">You are receiving this because you contacted us at codeverse.academy</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  await transporter.sendMail({
    from: `"Subhadip at CodeVerse Academy" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: `✅ We got your message, ${name.split(' ')[0]}! — CodeVerse Academy`,
    html,
  })
}

// 3. Enrollment confirmation email to student
export const sendEnrollmentConfirmation = async ({ name, email, course }) => {
  const transporter = createTransporter()

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #050508; color: #F1F5F9; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 0 auto; padding: 32px 16px; }
        .card { background: #13131C; border: 1px solid #1C1C2E; border-radius: 16px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #059669, #22D3EE); padding: 32px; text-align: center; }
        .icon { font-size: 48px; margin-bottom: 12px; }
        .header h1 { margin: 0; color: white; font-size: 24px; font-weight: 800; }
        .header p { margin: 6px 0 0; color: rgba(255,255,255,0.85); }
        .body { padding: 32px; }
        p { font-size: 15px; color: #94A3B8; line-height: 1.7; margin: 0 0 16px; }
        .course-badge { background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3); border-radius: 10px; padding: 16px 20px; text-align: center; margin: 20px 0; }
        .course-name { font-size: 20px; font-weight: 800; color: #818CF8; }
        .btn { display: block; background: linear-gradient(135deg, #6366F1, #4F46E5); color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 15px; font-weight: 700; text-align: center; margin: 24px 0; }
        .footer { background: #0D0D14; border-top: 1px solid #1C1C2E; padding: 18px 32px; text-align: center; }
        .footer p { margin: 0; font-size: 12px; color: #475569; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="card">
          <div class="header">
            <div class="icon">🎉</div>
            <h1>Enrollment Confirmed!</h1>
            <p>Welcome to the CodeVerse family, ${name.split(' ')[0]}!</p>
          </div>
          <div class="body">
            <p>You have successfully enrolled in:</p>
            <div class="course-badge">
              <div class="course-name">${course}</div>
              <div style="font-size:13px; color:#475569; margin-top:4px;">CodeVerse Academy</div>
            </div>
            <p>Your learning journey starts now. Our team will contact you within 24 hours with your login credentials and onboarding details.</p>
            <a href="http://localhost:3000/courses" class="btn">Go to Courses →</a>
          </div>
          <div class="footer">
            <p>© 2025 CodeVerse Academy · subhadipmahanty@gmail.com</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  await transporter.sendMail({
    from: `"CodeVerse Academy" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: `🎉 You're enrolled in ${course} — CodeVerse Academy`,
    html,
  })
}

// 4. Alert admin on new enrollment
export const sendEnrollmentAlertToAdmin = async ({ name, email, course }) => {
  const transporter = createTransporter()

  await transporter.sendMail({
    from: `"CodeVerse Academy" <${process.env.EMAIL_FROM}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🎓 New Enrollment: ${name} → ${course}`,
    html: `
      <div style="font-family:Arial,sans-serif;background:#050508;color:#F1F5F9;padding:32px;border-radius:12px;max-width:480px;">
        <h2 style="color:#6366F1;margin-top:0;">🎓 New Enrollment</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#22D3EE;">${email}</a></p>
        <p><strong>Course:</strong> ${course}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
        <p style="color:#475569;font-size:13px;margin-top:24px;">CodeVerse Academy · subhadipmahanty@gmail.com</p>
      </div>
    `,
  })
}
