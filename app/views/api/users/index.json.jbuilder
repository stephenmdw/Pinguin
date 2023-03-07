@users.each do |user|
    json.user do
        json.extract! @user, :id, :username, :created_at
    end
end