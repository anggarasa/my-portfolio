<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reply to Your Message</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; line-height: 1.6;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="text-align: center; padding: 30px 30px 20px 30px; border-bottom: 2px solid #333333;">
                            <div style="display: inline-block; width: 40px; height: 40px; background-color: #333333; border-radius: 50%; margin-bottom: 15px; position: relative;">
                                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #ffffff; font-size: 18px; font-weight: bold;">↩</div>
                            </div>
                            <h1 style="color: #333333; margin: 0; font-size: 24px; font-weight: 600; margin-bottom: 10px;">Reply to Your Message</h1>
                            <p style="color: #666666; margin: 0; font-size: 14px;">Thank you for contacting us through our portfolio</p>
                        </td>
                    </tr>

                    <!-- Reply Indicator -->
                    <tr>
                        <td style="padding: 0 30px 20px 30px;">
                            <div style="background-color: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 12px; border-radius: 8px; text-align: center; font-weight: 600;">
                                <span style="margin-right: 8px; font-size: 16px;">✓</span>
                                <strong>This is a reply to your message</strong>
                            </div>
                        </td>
                    </tr>

                    <!-- Info Section -->
                    <tr>
                        <td style="padding: 0 30px 20px 30px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef; padding: 20px;">
                                <tr>
                                    <td style="padding-bottom: 12px;">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="80" style="font-weight: 600; color: #6c757d; font-size: 14px; padding-bottom: 8px;">From:</td>
                                                <td style="color: #212529; font-size: 14px; padding-bottom: 8px;">Anggara Saputra - Developer</td>
                                            </tr>
                                            <tr>
                                                <td width="80" style="font-weight: 600; color: #6c757d; font-size: 14px; padding-bottom: 8px;">To:</td>
                                                <td style="color: #212529; font-size: 14px; padding-bottom: 8px;">{{ $contact->name }} ({{ $contact->email }})</td>
                                            </tr>
                                            <tr>
                                                <td width="80" style="font-weight: 600; color: #6c757d; font-size: 14px;">Subject:</td>
                                                <td style="color: #212529; font-size: 14px;">{{ $reply->subject }}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Message Section -->
                    <tr>
                        <td style="padding: 0 30px 20px 30px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e9ecef; border-radius: 8px; overflow: hidden;">
                                <tr>
                                    <td style="padding: 20px 20px 15px 20px; border-bottom: 1px solid #e9ecef;">
                                        <h3 style="color: #212529; margin: 0; font-size: 16px; font-weight: 600;">
                                            <span style="margin-right: 8px; font-size: 16px;">💬</span>
                                            Reply Message:
                                        </h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px 20px 20px 20px;">
                                        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #333333; white-space: pre-wrap; font-size: 14px; line-height: 1.5; color: #212529;">{{ $reply->message }}</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Timestamp -->
                    <tr>
                        <td style="padding: 0 30px 20px 30px; text-align: right;">
                            <p style="color: #6c757d; font-size: 12px; margin: 0;">Sent at: {{ $reply->sent_at->format('M d, Y \a\t H:i:s') }}</p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="text-align: center; padding: 20px 30px 30px 30px; border-top: 1px solid #e9ecef; color: #6c757d; font-size: 12px;">
                            <p style="margin: 0 0 8px 0;">This is an automated reply from our portfolio contact system.</p>
                            <p style="margin: 0 0 8px 0;">If you have any further questions, please don't hesitate to contact us again.</p>
                            <p style="margin: 0; font-weight: 600;">Anggara Saputra - Developer</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
