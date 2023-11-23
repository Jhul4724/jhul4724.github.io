<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $budget = $_POST["budget"];
    $usage = isset($_POST["usage"]) ? implode(", ", $_POST["usage"]) : "";
    $gamesProgramsUsed = $_POST["games-programs-used"];
    $resolution = isset($_POST["resolution"]) ? $_POST["resolution"] : "Not specified";
    $networking = isset($_POST["networking"]) ? $_POST["networking"] : "Not specified";
    $rgb = isset($_POST["myRange"]) ? $_POST["myRange"] : "Not specified";
    $color = isset($_POST["color"]) ? implode(", ", $_POST["color"]) : "";
    $colorOther = isset($_POST["color_other"]) ? $_POST["color_other"] : "";
    $additionalCustomization = $_POST["additional_customization"];
    $notes = $_POST["notes"];
    $timing = $_POST["timing"];

    // Email setup
    $to = "hujulien123@gmail.com, info@innovatechpc.ca"; // Change this to your email addresses
    $subject = "New PC Customization Form Submission";

    // Email message
    $message = "
    Name: $name
    Email: $email
    Phone: $phone

    Budget: $budget
    Intended Usage: $usage
    Games/Programs Used: $gamesProgramsUsed
    Resolution: $resolution
    Networking: $networking
    RGB: $rgb
    Color: $color $colorOther
    Additional Customization: $additionalCustomization
    Notes: $notes
    Desired Completion Date: $timing
    ";

    // Headers
    $headers = "From: $email" . "\r\n" .
        "Reply-To: $email" . "\r\n" .
        "X-Mailer: PHP/" . phpversion();

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        // Email sent successfully
        echo json_encode(["status" => "success"]);
    } else {
        // Email not sent
        echo json_encode(["status" => "error"]);
    }
} else {
    // Not a POST request
    echo json_encode(["status" => "error"]);
}
?>
