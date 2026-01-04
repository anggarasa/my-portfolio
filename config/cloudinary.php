<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cloudinary Configuration
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for Cloudinary service.
    | You can find your Cloud Name, API Key, and API Secret in your
    | Cloudinary Dashboard: https://cloudinary.com/console
    |
    */

    'cloud_url' => env('CLOUDINARY_URL'),

    /*
    |--------------------------------------------------------------------------
    | Upload Preset (Optional)
    |--------------------------------------------------------------------------
    |
    | If you have created an upload preset in Cloudinary, you can specify it here.
    | Upload presets allow you to define the default behavior for your uploads.
    |
    */
    'upload_preset' => env('CLOUDINARY_UPLOAD_PRESET'),

    /*
    |--------------------------------------------------------------------------
    | Notification URL (Optional)
    |--------------------------------------------------------------------------
    |
    | URL for Cloudinary to send notifications after upload is complete.
    |
    */
    'notification_url' => env('CLOUDINARY_NOTIFICATION_URL'),

];
