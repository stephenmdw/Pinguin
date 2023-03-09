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

    puts "Creating boards..."

    #Seed boards
    Board.create({title: "Ideas", user_id: 1})
    Board.create({title: "Cool photos", user_id: 5})
    Board.create({title: "Tahoe board", user_id: 4})
    Board.create({title: "Penguins", user_id: 1})
    
    puts "Creating pins..."
    pins = []
    #Seed pins
    
    
    pins << Pin.new({title: "a cool picture", description: "my new pic", user_id: 2}) #1
    pins << Pin.new({title: "Penguin wallpaper", description: "Made a cute penguin wallpaper", user_id: 3}) #2
    pins << Pin.new({title: "Dark picture of the city", description: "Couldn't figure out how to use flash", user_id: 4}) #3
    pins << Pin.new({title: "Monterey shore", description: "The weather was terrible", user_id: 4}) #4
    pins << Pin.new({title: "I love the snow", description: "But I hate the cold", user_id: 2}) #5
    pins << Pin.new({title: "Beautiful ocean rock thing", description: "Blue ass water", user_id: 5}) #6
    pins << Pin.new({title: "Green hilly background", description: "Took this photo with a drone", user_id: 6}) #7
    pins << Pin.new({title: "A new pin", description: "I can't think of new titles", user_id: 7}) #8
    pins << Pin.new({title: "A new pin part 2", description: "I need to make more", user_id: 8}) #9
    pins << Pin.new({title: "A new pin part 3", description: "What do i put here", user_id: 9}) #10
    pins << Pin.new({title: "A new pin part 4", description: "this is a pin", user_id: 2}) #11
    pins << Pin.new({title: "A new pin part 5", description: "this is another pin", user_id: 11}) #12
    pins << Pin.new({title: "Penguin just chilling", description: "He looks so relaxed", user_id: 1}) #13
    pins << Pin.new({title: "A baby penguin", description: "Looks like the logo", alt_text: "baby penguin sitting on snow", user_id: 1}) #14
    pins << Pin.new({title: "Two penguins together :)", description: "Cute mfs", user_id: 1}) #15
    pins << Pin.new({title: "How big do penguins get?- Smithsonian", description: "This shows how big different penguins can get", alt_text: "diagram of how big penguins get", destination_link: "https://ocean.si.edu/ocean-life/seabirds/how-big-do-penguins-get", user_id: 1}) #16
    pins << Pin.new({title: "Penguins dreaming of flying", description: "Their dream is to take to the skies", alt_text: "Two penguins looking up", user_id: 1}) #17
    pins << Pin.new({title: "Cute penguin wallpaper", description: "Stole this wallpaper, but I'm going to say I made it", user_id: 10}) #18
    pins << Pin.new({title: "Gondola photo", description: "Gondolas are sketchy", user_id: 7}) #19
    pins << Pin.new({title: "Me and my parents", description: "We got distracted by a plane", user_id: 4}) #20
    pins << Pin.new({title: "Two penguins", description: "Why walk when you can slide?", user_id: 1}) #21
    pins << Pin.new({title: "Me and my friend", description: "Me and the boi", user_id: 10}) #22 
    pins << Pin.new({title: "Me and the boys", description: "Ride or dies", user_id: 11}) #23
    pins << Pin.new({title: "TFT Penguin", description: "He's cute", user_id: 11}) #24
    pins << Pin.new({title: "Thought I looked good", description: "It's golden hour", user_id: 11}) #25
    pins << Pin.new({title: "Hard at work", description: "Rise and grind", user_id: 2}) #26
    pins << Pin.new({title: "Group of penguins", description: "Walking on the beach", user_id: 4}) #27
    pins << Pin.new({title: "A self portrait", description: "I was inspired by Ms. O'keefe", user_id: 4}) #28
    pins << Pin.new({title: "He tried to eat me later", description: "Trust no one, not even the people you get popsicles with", user_id: 8}) #29

    puts "Attaching photos to pins..."

    pins.each_with_index do |pin, index|
      pin.photo.attach(
        # The string passed to URI.open should be the URL of the image in its bucket.
        # This sample assumes the bucket name is `benchbnb-seeds`.
        io: URI.open("https://pinguin-seeds.s3.us-west-1.amazonaws.com/pin_#{index + 1}.jpeg"), 
        # io: URI.open("https://pinguin-seeds.s3.us-west-1.amazonaws.com/pin_1.jpeg"), 

        filename: "pin_#{index + 1}.jpeg"
      )
      
      pin.save!

    end

    puts "Linking pins and boards"
    #pinboard
    Pinboard.create!({board_id: 1, pin_id: 1})
    Pinboard.create!({board_id: 1, pin_id: 2})
    Pinboard.create!({board_id: 1, pin_id: 3})
    Pinboard.create!({board_id: 1, pin_id: 4})
    Pinboard.create!({board_id: 1, pin_id: 5})
    Pinboard.create!({board_id: 1, pin_id: 6})
    Pinboard.create!({board_id: 1, pin_id: 7})
    Pinboard.create!({board_id: 1, pin_id: 8})
    Pinboard.create!({board_id: 1, pin_id: 9})
    Pinboard.create!({board_id: 1, pin_id: 13})
    Pinboard.create!({board_id: 1, pin_id: 16})

    Pinboard.create!({board_id: 2, pin_id: 2})
    Pinboard.create!({board_id: 2, pin_id: 5})
    Pinboard.create!({board_id: 2, pin_id: 7})
    
    Pinboard.create!({board_id: 3, pin_id: 3})
    Pinboard.create!({board_id: 3, pin_id: 4})
    Pinboard.create!({board_id: 3, pin_id: 7})
    Pinboard.create!({board_id: 3, pin_id: 5})

    Pinboard.create!({board_id: 4, pin_id: 2})
    Pinboard.create!({board_id: 4, pin_id: 13})
    Pinboard.create!({board_id: 4, pin_id: 14})
    Pinboard.create!({board_id: 4, pin_id: 15})
    Pinboard.create!({board_id: 4, pin_id: 16})
    Pinboard.create!({board_id: 4, pin_id: 17})
    Pinboard.create!({board_id: 4, pin_id: 18})
    Pinboard.create!({board_id: 4, pin_id: 20})
    Pinboard.create!({board_id: 4, pin_id: 21})
    Pinboard.create!({board_id: 4, pin_id: 22})
    Pinboard.create!({board_id: 4, pin_id: 23})
    Pinboard.create!({board_id: 4, pin_id: 24})
    Pinboard.create!({board_id: 4, pin_id: 25})
    Pinboard.create!({board_id: 4, pin_id: 26})
    Pinboard.create!({board_id: 4, pin_id: 27})
    Pinboard.create!({board_id: 4, pin_id: 28})
    Pinboard.create!({board_id: 4, pin_id: 29})

    # https://pinguin-seeds.s3.us-west-1.amazonaws.com/pin_1.jpeg

    puts "Done!"
