# == Schema Information
#
# Table name: pinboards
#
#  id         :bigint           not null, primary key
#  board_id   :bigint           not null
#  pin_id     :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Pinboard < ApplicationRecord
    belongs_to :pin

    belongs_to :board
end
