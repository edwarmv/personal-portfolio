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

export const POST = (async ({ request, redirect }) => {
  const body = await request.formData();
  const requiredFields = ["name", "email", "message"];
  if (!requiredFields.every((key) => body.has(key))) {
    return redirect("/error-message");
  }
  try {
    await transporter.sendMail({
      from: SMTP_USER,
      to: SMTP_USER,
      subject: `Contact Form Submission from "${body.get("name")}" <${body.get("email")}>`,
      text: String(body.get("message")),
    });

    return redirect("/success-message");
  } catch (err) {
    return redirect("/error-message");
  }
}) satisfies APIRoute;
