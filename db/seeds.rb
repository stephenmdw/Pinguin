# require 'open-uri'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Board.destroy_all
    Pin.destroy_all
    Pinboard.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('boards')
    ApplicationRecord.connection.reset_pk_sequence!('pins')
    ApplicationRecord.connection.reset_pk_sequence!('pinboards')

    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'Demo-lition', 
    #   email: 'demo@user.io', 
      password: 'password'
    )
  
    # More users
    10.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        # email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    #Seed boards
    Board.create({title: "I don't know", user_id: 1})
    Board.create({title: "Cool photos", user_id: 5})
    Board.create({title: "Tahoe board", user_id: 4})

    #Seed pins
    Pin.create!({title: "a cool picture", description: "my new pic", user_id: 2})
    Pin.create!({title: "my new painting", description: "van gogh", user_id: 3})
    Pin.create!({title: "snowboarding picture", description: "at palisades", user_id: 4})
    Pin.create!({title: "the snowy mountains", description: "northstar sucks", user_id: 4})
    Pin.create!({title: "Lake Tahoe", description: "the water looks cold", user_id: 4})
    Pin.create!({title: "my new car", description: "love the PT cruiser", user_id: 5})
    Pin.create!({title: "A cool infographic", description: "Hope this hels", user_id: 6})
    Pin.create!({title: "A new pin", description: "I can't think of new titles", user_id: 7})
    Pin.create!({title: "A new pin part 2", description: "I need to make more pins", user_id: 8})
    Pin.create!({title: "A new pin part 3", description: "What do i put here", user_id: 9})
    Pin.create!({title: "A new pin part 4", description: "this is a pin", user_id: 2})
    Pin.create!({title: "A new pin part 5", description: "this is another pin", user_id: 11})

    #pinboard
    Pinboard.create({board_id: 1, pin_id: 1})
    Pinboard.create({board_id: 2, pin_id: 2})
    Pinboard.create({board_id: 3, pin_id: 3})
    Pinboard.create({board_id: 3, pin_id: 4})
    Pinboard.create({board_id: 2, pin_id: 5})
    Pinboard.create({board_id: 1, pin_id: 6})
    Pinboard.create({board_id: 2, pin_id: 7})



    Pin.first(12).each_with_index do |pin, index|
      pin.photo.attach(
        # The string passed to URI.open should be the URL of the image in its bucket.
        # This sample assumes the bucket name is `benchbnb-seeds`.
        io: URI.open("https://pinguin-seeds.s3.us-west-1.amazonaws.com/pin_#{index + 1}.jpeg"), 
        # io: URI.open("https://pinguin-seeds.s3.us-west-1.amazonaws.com/pin_1.jpeg"), 

        filename: "pin_#{index + 1}.jpeg"
      )
    end

    # https://pinguin-seeds.s3.us-west-1.amazonaws.com/pin_1.jpeg

    puts "Done!"
