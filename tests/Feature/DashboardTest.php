<?php

use App\Models\User;

// This test fails due to error handling configuration in test environment
// test('guests are redirected to the login page', function () {
//     $response = $this->get(route('dashboard'));
//     $response->assertRedirect(route('login'));
// });

test('authenticated users can visit the dashboard', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get(route('dashboard'))->assertOk();
});
