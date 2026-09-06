const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();


// =====================================================
// PORT
// =====================================================

const PORT = process.env.PORT || 3000;


// =====================================================
// FRONTEND PATH
// =====================================================

// backend/server.js se ek level bahar jaakar
// frontend folder ko target karega

const frontendPath = path.resolve(__dirname, "../frontend");

console.log("Frontend Path:", frontendPath);


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


// =====================================================
// FRONTEND STATIC FILES
// =====================================================

// CSS
// JavaScript
// Images
// Fonts
// etc. serve honge

app.use(express.static(frontendPath));


// =====================================================
// HOME PAGE
// =====================================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(frontendPath, "index.html")
    );

});


// =====================================================
// CONTACT PAGE
// URL: /contact
// =====================================================

app.get("/contact", (req, res) => {

    res.sendFile(
        path.join(frontendPath, "contact.html")
    );

});


// ABOUT PAGE
app.get("/about", (req, res) => {
    res.sendFile(
        path.join(frontendPath, "about.html")
    );
});

// Car-Denting
app.get("/Car-Denting", (req, res) => {
    res.sendFile(
        path.join(frontendPath, "Car-Denting.html")
    );
});

// Car-android-Screens
app.get("/Car-android-Screens", (req, res) => {
    res.sendFile(
        path.join(frontendPath, "Car-android-Screens.html")
    );
});

// Car-Body-Kits
app.get("/Car-Body-Kits", (req, res) => {
    res.sendFile(
        path.join(frontendPath, "Car-Body-Kits.html")
    );
});

// Car-Interior
app.get("/Car-Interior", (req, res) => {
    res.sendFile(
        path.join(frontendPath, "Car-Interior.html")
    );
});

// Car-Mechanical-Services
app.get("/Car-Mechanical-Services", (req, res) => {
    res.sendFile(
        path.join(frontendPath, "Car-Mechanical-Services.html")
    );
});

// Car-Polishing
app.get("/Car-Polishing", (req, res) => {
    res.sendFile(
        path.join(frontendPath, "Car-Polishing.html")
    );
});

// Car-Speakers
app.get("/Car-Speakers", (req, res) => {
    res.sendFile(
        path.join(frontendPath, "Car-Speakers.html")
    );
});

// Car-Upholstery
app.get("/Car-Upholstery", (req, res) => {
    res.sendFile(
        path.join(frontendPath, "Car-Upholstery.html")
    );
});

// Car-Window-Tinting
app.get("/Car-Window-Tinting", (req, res) => {
    res.sendFile(
        path.join(frontendPath, "Car-Window-Tinting.html")
    );
});

// Car-Wrapping
app.get("/Car-Wrapping", (req, res) => {
    res.sendFile(
        path.join(frontendPath, "Car-Wrapping.html")
    );
});

// gallery
app.get("/gallery", (req, res) => {
    res.sendFile(
        path.join(frontendPath, "gallery.html")
    );
});

// SERVICES PAGE
app.get("/our-product", (req, res) => {

    res.sendFile(
        path.join(frontendPath, "our-product.html")
    );

});


// =====================================================
// TEST API
// =====================================================

app.get("/api/test", (req, res) => {

    res.json({

        success: true,

        message: "Backend is working!"

    });

});


// =====================================================
// NODEMAILER TRANSPORTER
// =====================================================

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});


// =====================================================
// CONTACT FORM API
// =====================================================

app.post("/api/contact", async (req, res) => {

    try {

        // -------------------------------------------------
        // GET FORM DATA
        // -------------------------------------------------

        const {
            name,
            email,
            phone,
            message
        } = req.body;


        // -------------------------------------------------
        // VALIDATION
        // -------------------------------------------------

        if (!name || !email || !phone || !message) {

            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });

        }


        // =================================================
        // 1. EMAIL TO WEBSITE OWNER
        // =================================================

        const adminMailOptions = {

            from: `"BestFit Auto Accessories Website" <${process.env.EMAIL_USER}>`,

            to: process.env.EMAIL_TO,

            // When you click Reply, it will reply to customer
            replyTo: email,

            subject: `New Website Enquiry - ${name}`,

            html: `

<!DOCTYPE html>

<html>

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>New Website Enquiry</title>

</head>


<body style="
    margin:0;
    padding:0;
    background-color:#f2f2f2;
    font-family:Arial, Helvetica, sans-serif;
">


<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        background-color:#f2f2f2;
        padding:30px 10px;
    "
>

<tr>

<td align="center">


<!-- ================================================= -->
<!-- MAIN CONTAINER -->
<!-- ================================================= -->

<table
    width="700"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        max-width:700px;
        width:100%;
        background:#ffffff;
        border-radius:8px;
        overflow:hidden;
    "
>


<!-- ================================================= -->
<!-- HEADER -->
<!-- ================================================= -->

<tr>

<td
    style="
        background:#111111;
        padding:28px 25px;
        text-align:center;
        border-bottom:4px solid #e21b23;
    "
>

<img
    src="https://bestfitautoaccessories.netlify.app/images/logo.png"
    alt="BestFit Auto Accessories"
    style="
        width:260px;
        max-width:90%;
        height:auto;
        display:block;
        margin:0 auto;
    "
>


<p
    style="
        margin:10px 0 0;
        color:#ffffff;
        font-size:12px;
        letter-spacing:1.5px;
    "
>
    PREMIUM CAR CARE &amp; ACCESSORIES
</p>


</td>

</tr>



<!-- ================================================= -->
<!-- TITLE -->
<!-- ================================================= -->

<tr>

<td
    style="
        padding:35px 30px 20px;
        text-align:center;
    "
>

<h1
    style="
        margin:0;
        color:#111111;
        font-size:30px;
        line-height:40px;
    "
>
    New Website

    <span style="color:#e21b23;">
        Enquiry
    </span>
</h1>


<div
    style="
        width:60px;
        height:3px;
        background:#e21b23;
        margin:15px auto;
    "
></div>


<p
    style="
        margin:0;
        color:#666666;
        font-size:15px;
        line-height:24px;
    "
>
    You have received a new enquiry from your website.
</p>


</td>

</tr>



<!-- ================================================= -->
<!-- CUSTOMER DETAILS -->
<!-- ================================================= -->

<tr>

<td
    style="
        padding:10px 30px 30px;
    "
>


<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        border:1px solid #e1e1e1;
        border-radius:6px;
        overflow:hidden;
    "
>


<!-- NAME -->

<tr>

<td
    width="35%"
    style="
        padding:17px;
        background:#fafafa;
        border-bottom:1px solid #e5e5e5;
        color:#222222;
        font-size:14px;
        font-weight:bold;
    "
>
    👤 &nbsp; Customer Name
</td>


<td
    style="
        padding:17px;
        border-bottom:1px solid #e5e5e5;
        color:#555555;
        font-size:14px;
    "
>
    ${name}
</td>

</tr>



<!-- EMAIL -->

<tr>

<td
    width="35%"
    style="
        padding:17px;
        background:#fafafa;
        border-bottom:1px solid #e5e5e5;
        color:#222222;
        font-size:14px;
        font-weight:bold;
    "
>
    📧 &nbsp; Email Address
</td>


<td
    style="
        padding:17px;
        border-bottom:1px solid #e5e5e5;
        color:#555555;
        font-size:14px;
    "
>
    ${email}
</td>

</tr>



<!-- PHONE -->

<tr>

<td
    width="35%"
    style="
        padding:17px;
        background:#fafafa;
        border-bottom:1px solid #e5e5e5;
        color:#222222;
        font-size:14px;
        font-weight:bold;
    "
>
    📞 &nbsp; Phone Number
</td>


<td
    style="
        padding:17px;
        border-bottom:1px solid #e5e5e5;
        color:#555555;
        font-size:14px;
    "
>
    ${phone}
</td>

</tr>



<!-- MESSAGE -->

<tr>

<td
    width="35%"
    style="
        padding:17px;
        background:#fafafa;
        color:#222222;
        font-size:14px;
        font-weight:bold;
        vertical-align:top;
    "
>
    💬 &nbsp; Message
</td>


<td
    style="
        padding:17px;
        color:#555555;
        font-size:14px;
        line-height:24px;
        vertical-align:top;
    "
>
    ${message}
</td>

</tr>


</table>


</td>

</tr>



<!-- ================================================= -->
<!-- QUICK RESPONSE -->
<!-- ================================================= -->

<tr>

<td
    style="
        padding:0 30px 30px;
    "
>


<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        background:#fff5f5;
        border-left:5px solid #e21b23;
        border-radius:5px;
    "
>

<tr>

<td
    style="
        padding:22px;
    "
>


<h3
    style="
        margin:0 0 8px;
        color:#222222;
        font-size:17px;
    "
>
    Quick Response. Better Service.
</h3>


<p
    style="
        margin:0;
        color:#666666;
        font-size:13px;
        line-height:21px;
    "
>
    A new customer has contacted you through your
    website. Please get in touch with the customer
    as soon as possible.
</p>


</td>

</tr>

</table>


</td>

</tr>



<!-- ================================================= -->
<!-- SERVICES -->
<!-- ================================================= -->

<tr>

<td
    style="
        background:#111111;
        padding:30px;
        border-top:4px solid #e21b23;
    "
>


<h2
    style="
        margin:0 0 20px;
        text-align:center;
        color:#ffffff;
        font-size:20px;
    "
>
    Our Services
</h2>


<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
>

<tr>


<td
    width="50%"
    style="
        color:#eeeeee;
        font-size:13px;
        line-height:29px;
        vertical-align:top;
    "
>

<span style="color:#e21b23;">✓</span>
Car Android Screens
<br>

<span style="color:#e21b23;">✓</span>
Window Tinting
<br>

<span style="color:#e21b23;">✓</span>
Speakers &amp; Sound Systems
<br>

<span style="color:#e21b23;">✓</span>
Interior &amp; Exterior Lighting
<br>

<span style="color:#e21b23;">✓</span>
Car Wrapping &amp; PPF

</td>



<td
    width="50%"
    style="
        color:#eeeeee;
        font-size:13px;
        line-height:29px;
        vertical-align:top;
    "
>

<span style="color:#e21b23;">✓</span>
Car Body Kits
<br>

<span style="color:#e21b23;">✓</span>
Car Upholstery
<br>

<span style="color:#e21b23;">✓</span>
Ceramic Coating
<br>

<span style="color:#e21b23;">✓</span>
Mechanical Services
<br>

<span style="color:#e21b23;">✓</span>
Denting &amp; Painting

</td>


</tr>

</table>


</td>

</tr>



<!-- ================================================= -->
<!-- FOOTER -->
<!-- ================================================= -->

<tr>

<td
    style="
        background:#ffffff;
        padding:28px 20px;
        text-align:center;
    "
>


<img
    src="https://bestfitautoaccessories.netlify.app/images/logo.png"
    alt="BestFit Auto Accessories"
    style="
        width:180px;
        max-width:80%;
        height:auto;
        margin-bottom:10px;
    "
>


<p
    style="
        margin:5px 0 15px;
        color:#555555;
        font-size:14px;
        font-style:italic;
    "
>
    Drive in Style, Arrive in Luxury.
</p>


<div
    style="
        width:50px;
        height:2px;
        background:#e21b23;
        margin:0 auto 15px;
    "
></div>


<p
    style="
        margin:0;
        color:#888888;
        font-size:12px;
        line-height:20px;
    "
>
    BestFit Car Accessories &amp; Auto Care
    <br>
    Abu Dhabi, UAE
</p>


<p
    style="
        margin:12px 0 0;
        color:#aaaaaa;
        font-size:11px;
    "
>
    This enquiry was received through your website.
</p>


<!-- DEVELOPED BY -->

<p
    style="
        margin:15px 0 0;
        padding-top:12px;
        border-top:1px solid #eeeeee;
        color:#999999;
        font-size:11px;
        line-height:18px;
    "
>

    Developed by

    <a
        href="https://hannanraza.netlify.app/"
        target="_blank"
        style="
            color:#e21b23;
            text-decoration:none;
            font-weight:bold;
        "
    >
        Hannan Raza
    </a>

</p>


</td>

</tr>


</table>


</td>

</tr>

</table>


</body>

</html>

`
        };


        // =====================================================
        // 2. CONFIRMATION EMAIL TO CUSTOMER
        // =====================================================

        const customerMailOptions = {

            from: `"BestFit Auto Accessories" <${process.env.EMAIL_USER}>`,

            to: email,

            // Customer reply will come to business email
            replyTo: process.env.EMAIL_TO,

            subject:
                "Enquiry Successfully Received - BestFit Auto Accessories",


            html: `

<!DOCTYPE html>

<html>

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Enquiry Successfully Received</title>

</head>


<body style="
    margin:0;
    padding:0;
    background:#f2f2f2;
    font-family:Arial, Helvetica, sans-serif;
">


<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        background:#f2f2f2;
        padding:30px 10px;
    "
>

<tr>

<td align="center">


<table
    width="650"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        max-width:650px;
        width:100%;
        background:#ffffff;
        border-radius:8px;
        overflow:hidden;
    "
>


<!-- ================================================= -->
<!-- HEADER -->
<!-- ================================================= -->

<tr>

<td
    style="
        background:#111111;
        padding:28px 20px;
        text-align:center;
        border-bottom:4px solid #e21b23;
    "
>


<img
    src="https://bestfitautoaccessories.netlify.app/images/logo.png"
    alt="BestFit Auto Accessories"
    style="
        width:220px;
        max-width:90%;
        height:auto;
    "
>


<p
    style="
        margin:9px 0 0;
        color:#ffffff;
        font-size:12px;
        letter-spacing:1px;
    "
>
    PREMIUM CAR CARE &amp; ACCESSORIES
</p>


</td>

</tr>



<!-- ================================================= -->
<!-- SUCCESS MESSAGE -->
<!-- ================================================= -->

<tr>

<td
    style="
        padding:40px 30px 25px;
        text-align:center;
    "
>


<!-- CHECK ICON -->

<div
    style="
        width:60px;
        height:60px;
        line-height:60px;
        margin:0 auto 20px;
        background:#e21b23;
        color:#ffffff;
        border-radius:50%;
        font-size:30px;
        font-weight:bold;
    "
>
    ✓
</div>


<h1
    style="
        margin:0;
        color:#111111;
        font-size:27px;
        line-height:36px;
    "
>
    Enquiry Successfully Received!
</h1>


<p
    style="
        margin:18px 0 0;
        color:#555555;
        font-size:15px;
    "
>
    Hi ${name},
</p>


<p
    style="
        margin:10px 0 0;
        color:#666666;
        font-size:14px;
        line-height:24px;
    "
>

    Thank you for contacting
    <strong>BestFit Auto Accessories</strong>.

    Your enquiry has been successfully received.

</p>


</td>

</tr>



<!-- ================================================= -->
<!-- WHAT HAPPENS NEXT -->
<!-- ================================================= -->

<tr>

<td
    style="
        padding:0 30px 30px;
    "
>


<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        background:#fff5f5;
        border-left:5px solid #e21b23;
        border-radius:5px;
    "
>

<tr>

<td
    style="
        padding:22px;
    "
>


<h3
    style="
        margin:0 0 8px;
        color:#222222;
        font-size:17px;
    "
>
    What happens next?
</h3>


<p
    style="
        margin:0;
        color:#666666;
        font-size:13px;
        line-height:22px;
    "
>

    Our team has received your request and will review
    your enquiry. We will get back to you as soon as
    possible with the required information and assistance.

</p>


</td>

</tr>

</table>


</td>

</tr>



<!-- ================================================= -->
<!-- YOUR ENQUIRY DETAILS -->
<!-- ================================================= -->

<tr>

<td
    style="
        padding:0 30px 30px;
    "
>


<h3
    style="
        margin:0 0 15px;
        color:#222222;
        font-size:17px;
    "
>
    Your Enquiry Details
</h3>


<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        border:1px solid #eeeeee;
    "
>


<!-- NAME -->

<tr>

<td
    width="35%"
    style="
        padding:13px;
        background:#fafafa;
        font-weight:bold;
        font-size:13px;
        color:#333333;
    "
>
    Name
</td>


<td
    style="
        padding:13px;
        font-size:13px;
        color:#555555;
    "
>
    ${name}
</td>

</tr>



<!-- PHONE -->

<tr>

<td
    width="35%"
    style="
        padding:13px;
        background:#fafafa;
        font-weight:bold;
        font-size:13px;
        color:#333333;
    "
>
    Phone
</td>


<td
    style="
        padding:13px;
        font-size:13px;
        color:#555555;
    "
>
    ${phone}
</td>

</tr>



<!-- MESSAGE -->

<tr>

<td
    width="35%"
    style="
        padding:13px;
        background:#fafafa;
        font-weight:bold;
        font-size:13px;
        color:#333333;
        vertical-align:top;
    "
>
    Message
</td>


<td
    style="
        padding:13px;
        font-size:13px;
        color:#555555;
        line-height:21px;
        vertical-align:top;
    "
>
    ${message}
</td>

</tr>


</table>


</td>

</tr>



<!-- ================================================= -->
<!-- CUSTOMER FOOTER -->
<!-- ================================================= -->

<tr>

<td
    style="
        background:#111111;
        padding:30px 20px;
        text-align:center;
        border-top:4px solid #e21b23;
    "
>


<img
    src="https://bestfitautoaccessories.netlify.app/images/logo.png"
    alt="BestFit Auto Accessories"
    style="
        width:170px;
        max-width:80%;
        height:auto;
    "
>


<p
    style="
        margin:12px 0 8px;
        color:#ffffff;
        font-size:14px;
        font-style:italic;
    "
>
    Drive in Style, Arrive in Luxury.
</p>


<p
    style="
        margin:0;
        color:#aaaaaa;
        font-size:12px;
        line-height:20px;
    "
>
    BestFit Car Accessories &amp; Auto Care
    <br>
    Abu Dhabi, UAE
</p>


<!-- DEVELOPER -->

<p
    style="
        margin:15px 0 0;
        padding-top:12px;
        border-top:1px solid #333333;
        color:#888888;
        font-size:11px;
        line-height:18px;
    "
>

    Developed by

    <a
        href="https://hannanraza.netlify.app/"
        target="_blank"
        style="
            color:#e21b23;
            text-decoration:none;
            font-weight:bold;
        "
    >
        Hannan Raza
    </a>

</p>


</td>

</tr>


</table>


</td>

</tr>

</table>


</body>

</html>

`
        };


        // =====================================================
        // SEND ADMIN EMAIL
        // =====================================================

        await transporter.sendMail(adminMailOptions);


        // =====================================================
        // SEND CUSTOMER CONFIRMATION EMAIL
        // =====================================================

        await transporter.sendMail(customerMailOptions);


        // =====================================================
        // CONSOLE
        // =====================================================

        console.log("Admin email sent successfully!");

        console.log("Customer confirmation email sent successfully!");


        // =====================================================
        // SUCCESS RESPONSE TO FRONTEND
        // =====================================================

        res.status(200).json({

            success: true,

            message:
                "Your enquiry has been successfully submitted. We will get back to you soon."

        });


    } catch (error) {

        // =====================================================
        // ERROR
        // =====================================================

        console.error("Email Error:", error);


        res.status(500).json({

            success: false,

            message:
                "Unable to send your enquiry. Please try again."

        });

    }

});

// =====================================================
// 404 ROUTE
// =====================================================

app.use((req, res) => {

    res.status(404).send("Page Not Found");

});


// =====================================================
// START SERVER
// =====================================================

app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `Server running on port ${PORT}`
    );

});