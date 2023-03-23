class EditPinBoards < ActiveRecord::Migration[7.0]
  def change
    remove_index :pinboards, [:board_id, :pin_id]
    add_index :pinboards, [:board_id, :pin_id]

  end
end
