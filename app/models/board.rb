# == Schema Information
#
# Table name: boards
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  description :text
#  secret      :boolean
#  user_id     :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Board < ApplicationRecord
    validates :title, presence: true
    
    belongs_to :user

    has_many :pinboards,
        dependent: :destroy

    has_many :pins, 
        through: :pinboards
end
