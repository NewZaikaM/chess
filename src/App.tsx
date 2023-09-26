import { useState, useEffect } from 'react';

import BoardComponent from './components/BoardComponent';
import { Board } from './models/Board';
import { Player } from './models/Player';

import './App.css';
import { Colors } from './models/Colors';
import LostFigures from './components/LostFigures';

function App() {
	const [board, setBoard] = useState(new Board());
	const [whitePlayer] = useState(new Player(Colors.WHITE));
	const [blackPlayer] = useState(new Player(Colors.BLACK));
	const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

	useEffect(() => {
		restart();
		setCurrentPlayer(whitePlayer);
	}, []);

	function restart() {
		const newBoard = new Board();
		newBoard.initCells();
		newBoard.addFigures();
		setBoard(newBoard);
	}

	function swapPlayer() {
		setCurrentPlayer(
			currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer,
		);
	}
	return (
		<div className="app">
			<BoardComponent
				board={board}
				setBoard={setBoard}
				currentPlayer={currentPlayer}
				swapPlayer={swapPlayer}
			/>
			<div>
				<LostFigures title="Черные фигуры" figures={board.lostBlackFigures} />
				<LostFigures title="Белые фигуры" figures={board.lostWhiteFigures} />
			</div>
		</div>
	);
}

export default App;