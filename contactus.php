<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $message = $_POST["message"];

    // Set the recipient email addresses
    $to1 = "info@innovatechpc.ca";
    $to2 = "hujulien123@gmail.com";

    // Set the subject of the email
    $subject = "New Contact Form Submission";

    // Build the email message
    $email_message = "Name: $name\n";
    $email_message .= "Email: $email\n";
    $email_message .= "Phone: $phone\n";
    $email_message .= "Message:\n$message";

    // Send the email to the first recipient
    mail($to1, $subject, $email_message);

    // Send the email to the second recipient
    mail($to2, $subject, $email_message);

    // Respond to the JavaScript with a JSON response
    $response = [
        'success' => true,
        'message' => 'Thank you for your message! We will contact you shortly.'
    ];

    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
}
?>
