<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('description');
            $table->text('long_description')->nullable();
            $table->string('image')->nullable();
            $table->json('images')->nullable(); // Array of image URLs
            $table->json('technologies')->nullable(); // Array of technologies
            $table->string('category');
            $table->string('github_url')->nullable();
            $table->string('live_url')->nullable();
            $table->string('duration')->nullable();
            $table->string('year')->nullable();
            $table->string('role')->nullable();
            $table->json('challenges')->nullable(); // Array of challenges
            $table->json('solutions')->nullable(); // Array of solutions
            $table->json('features')->nullable(); // Array of features
            $table->json('demo_accounts')->nullable(); // Array of demo accounts
            $table->json('testimonial')->nullable(); // Testimonial object
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->integer('sort_order')->default(0);
            $table->boolean('featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
