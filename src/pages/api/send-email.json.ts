import type { APIRoute } from "astro";
import { createTransport } from "nodemailer";
import { SMTP_USER, SMTP_PASS } from "astro:env/server";

export const prerender = false;

const transporter = createTransport({
  service: "iCloud",
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export const POST = (async ({ request }) => {
  const body = await request.formData();
  const requiredFields = ["name", "email", "message"];
  if (!requiredFields.every((key) => body.has(key))) {
    return new Response(
      JSON.stringify({
        status: "fail",
        data: requiredFields.reduce((acc, key) => {
          if (body.has(key)) {
            return acc;
          }

          return { ...acc, [key]: "Field is required" };
        }, {}),
      }),
      { status: 400 },
    );
  }
  try {
    await transporter.sendMail({
      from: SMTP_USER,
      to: SMTP_USER,
      subject: `Contact Form Submission from "${body.get("name")}" <${body.get("email")}>`,
      text: String(body.get("message")),
    });

    return new Response(
      JSON.stringify({
        status: "success",
        data: {
          message: "Email sent successfully",
        },
      }),
      { status: 200 },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Failed to send email",
      }),
      { status: 500 },
    );
  }
}) satisfies APIRoute;
