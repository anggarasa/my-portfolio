<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Message from Portfolio</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #007bff;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #007bff;
            margin: 0;
            font-size: 24px;
        }
        .info-section {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .info-row {
            display: flex;
            margin-bottom: 10px;
        }
        .info-label {
            font-weight: bold;
            width: 80px;
            color: #495057;
        }
        .info-value {
            flex: 1;
            color: #212529;
        }
        .message-section {
            background-color: #ffffff;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            padding: 20px;
            margin-top: 20px;
        }
        .message-section h3 {
            color: #495057;
            margin-top: 0;
            border-bottom: 1px solid #dee2e6;
            padding-bottom: 10px;
        }
        .message-content {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #007bff;
            white-space: pre-wrap;
            font-size: 14px;
            line-height: 1.5;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            color: #6c757d;
            font-size: 12px;
        }
        .timestamp {
            color: #6c757d;
            font-size: 12px;
            text-align: right;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 New Message from Portfolio</h1>
            <p>You have received a new message through your portfolio contact form</p>
        </div>

        <div class="info-section">
            <div class="info-row">
                <div class="info-label">Name:</div>
                <div class="info-value">{{ $contact->name }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Email:</div>
                <div class="info-value">
                    <a href="mailto:{{ $contact->email }}" style="color: #007bff; text-decoration: none;">
                        {{ $contact->email }}
                    </a>
                </div>
            </div>
            <div class="info-row">
                <div class="info-label">Status:</div>
                <div class="info-value">
                    <span style="background-color: #28a745; color: white; padding: 2px 8px; border-radius: 3px; font-size: 11px;">
                        NEW
                    </span>
                </div>
            </div>
        </div>

        <div class="message-section">
            <h3>💬 Message:</h3>
            <div class="message-content">{{ $contact->message }}</div>
        </div>

        <div class="timestamp">
            Received at: {{ $contact->created_at->format('M d, Y \a\t H:i:s') }}
        </div>

        <div class="footer">
            <p>This message was sent automatically from your portfolio system.</p>
            <p>Please reply to this message promptly to provide good service to your visitor.</p>
        </div>
    </div>
</body>
</html>
