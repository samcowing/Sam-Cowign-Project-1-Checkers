# Sam-Cowing-Project-1-Checkers
Overview
1. Descripton
This is a checkers games that can be played between two active players. Players must choose between being player 1 (black pieces) or player 2 (red pieces). Learn more about the game play itself in the rules below. The technologies used are HTML, CSS and Javascript. 

2. Install 
For install, simply fork and clone the github repository <https://github.com/samcowing/Sam-Cowing-Project-1-Checkers>. You can then play the game in a browser using your local version.

3. Rules
- Board 
-- A classic 8x8 chessboard, only the dark squares are used.
-- It is positioned so that each player has a light square on the right side corner.
-- 24 discs (12 of 2 colors)

Typically, they are flat and round. The color of one set is black and the other red or white or beige.
- Game play
-- Checkers is played by two players.
-- Each player begins the game with 12 discs and places them on the 12 dark squares closest to him or her.
-- Black opens the game, then players alternate their turns.
-- The pieces always move diagonally and standard (non-king) pieces are always limited to forward moves.
-- A piece making a non-capturing move may move only one square.
- Captures 
-- To capture a piece of your opponent, your piece leaps over one of the opponent's pieces and lands in a straight diagonal line on the other side. This landing square must be empty.
-- When a piece is captured, it is removed from the board.
-- Only one piece may be captured in a single jump, but multiple jumps are allowed on a single turn.
-- If a player is able to make the capture, then the jump must be made.
-- For this version of the game, you may only capture once per turn.
-- If more than one capture is available, then the player decides if he prefers this or not.
- Upgrade a piece to a King 
-- When a piece reaches the furthest row, it is crowned and becomes a king.
-- One of the pieces which had been captured is placed on top of the king so that it is twice as high as a single piece.
-- Kings are limited to moving diagonally but can move both forward and backward.
-- Kings may combine jumps in several directions (forward and backward) on the same turn.
- End of the Game
-- A player wins the game when the opponent cannot make a move.
-- This happens usually because all of the opponent's pieces have been captured, but it could also be because all of his pieces are blocked in.

4. Key Technology Details 
- The board
-- The board is set up using an HTML table, with column index of 0 - 7 and row idex of 0 - 7. 
-- The boards sizing, colors and general apperenace is created using CSS.
-- The pieces are set up in span with unique ids/classes to call the appropriate display.
-- The pieces are children of the squares.
- Moving Pieces
-- The game is ready to play upon rendering, which is handled by the JS checking for available moves for player 1. 
-- If it is the players turn, clicking a piece will rerun the JS for checking available spots, but only for that piece, and then make those squares available. Note that a "winTest" flag when checking for any available spots determines whether you are just running a check for available spots, or if you are moving a piece and should have the spots be available. 
-- Once you select an available square, the piece is removed as a child from that square, and appended to the new square.
-- For jumps, when a piece moves more than one row forward, it will trigger a check to determine what piece was jumped. There are four options for jumps: right, left, king right, and king left. Determing whether a piece moved forward or backward (based off the turn and if piece is a king) and right or left cell direction determines which of the adjactent saved "enemy player" pieces was jumped. That enemy player piece has its piece class replaced with "removed" to ensure it is not read as a active piece by the opposite player before being removed as a child.
- Kings
-- A king is created by adding the king class to any player 1 piece that reached row 0 or any player 2 piece that reached row 7. 
-- For moving king pieces, having the king class allows an addition x (row) coordinate for checking available squares for movement. Note that if a piece is not a king, that added x coordinate is just passed as a null.
-- Jumping for kings is handled similarly to king jumps, where the king x switches whether the king would be jumping left or right (since it is the opposite backwards), then the king class in combination of what scenario triggered the jump function, determines whether the jump is treated as a king jump or not.
- Winning 
-- Wins are determined by checking if any pieces with the players class are present or by the check for available spots at the beginning of each turn. If there are no spots available, that player loses. 

4. Future features
- Double Jumps
- Saving previous game wins/losses
- Mobile friendly
- Dark or light modes

5. Credits
Thank you to my General Assembly classmates, especially the fellow checkers game creators, and an expecially big thanks to our class instructor Joshua, who I may have been stuck at just moving the pieces without. 

Play the game: https://samcowing.github.io/Sam-Cowing-Project-1-Checkers/
