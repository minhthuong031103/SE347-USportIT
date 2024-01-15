import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';
export async function POST(req: Request) {
  const body = await req.json();
  if (!body) return new Response('no body', { status: 400 });
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({}), { status: 400 });
    }
    if (user.otp !== body.otp) {
      return new Response(JSON.stringify('OTP is not valid'), { status: 200 });
    }
    const update = await prisma.user.update({
      where: {
        email: body.email,
      },
      data: {
        otp: null,
        isEmailVerified: true,
      },
    });
    if (update) {
      return new Response(JSON.stringify('OTP verified'), { status: 200 });
    }
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const body = await req.json();
  console.log(body);
  console.log('bodyyyyyyyyyyyyy');
  if (!body) return new Response('no body', { status: 400 });
  const email = body.email;
  const otp = Math.floor(100000 + Math.random() * 900000); // generate 6-digit OTP
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return new Response(JSON.stringify({}), { status: 400 });
    }
    const update = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        otp: otp.toString(),
      },
    });
    if (update) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
          user: 'playground.dev001@gmail.com',
          pass: 'upnilkyofuyzkhla',
        },
      });

      // send mail with defined transport object
      await transporter.sendMail({
        from: '"EliteMotion" <playground.dev001@gmail.com>',
        to: body.email,
        subject: 'Email Verification OTP',
        text: `Your OTP for email verification is: ${otp}`,
        html: `
        <head>
        <style>
      .title {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        background-color: #000; 
        color: #fff; 
        padding: 10px; 
        border-radius: 5px; 
        margin-bottom:15px;
        }
        </style>
      </head>
    <body>
      <div class="title">Elite Motion</div>
      <div> <b>Your OTP code is: ${otp}</b></div>
    </body>
         `, // HTML body
      });
      return new Response(JSON.stringify('OTP sent'), { status: 200 });
    }
  } catch (err) {
    console.log(err);
  }
}
