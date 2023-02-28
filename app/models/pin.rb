# == Schema Information
#
# Table name: pins
#
#  id               :bigint           not null, primary key
#  board_id         :bigint
#  title            :string           not null
#  description      :text
#  alt_text         :string
#  destination_link :string
#  user_id          :bigint           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Pin < ApplicationRecord
    validates :user_id, presence: true

    belongs_to :user
    belongs_to :board
end
