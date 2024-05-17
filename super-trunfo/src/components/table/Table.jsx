import { useState } from 'react'
import './Table.css'

function Table() {

	const cartas = [
		{
			imgCarta: "src/assets/barbaro.png",
			nomeCarta: "Bárbaro",
			forca: 200,
			defesa: 110,
			inteligencia: 65,
			agilidade: 90
		},
		{
			imgCarta: "src/assets/assassino.png",
			nomeCarta: "Assassino",
			forca: 100,
			defesa: 75,
			inteligencia: 80,
			agilidade: 190
		},
		{
			imgCarta: "src/assets/bardo.png",
			nomeCarta: "Bardo",
			forca: 60,
			defesa: 65,
			inteligencia: 160,
			agilidade: 140
		},
		{
			imgCarta: "src/assets/guerreiro.png",
			nomeCarta: "Guerreiro",
			forca: 170,
			defesa: 155,
			inteligencia: 85,
			agilidade: 85
		},
		{
			imgCarta: "src/assets/ladino.png",
			nomeCarta: "Ladino",
			forca: 40,
			defesa: 60,
			inteligencia: 125,
			agilidade: 200
		},
		{
			imgCarta: "src/assets/mago.png",
			nomeCarta: "Mago",
			forca: 20,
			defesa: 15,
			inteligencia: 210,
			agilidade: 55
		}
	]

	const cartasPc = cartas
	const cartasJogador = cartas

	function comprarCarta() {
		const cartaIndex = Math.floor(Math.random() * cartasJogador.length)
		const cartaEscolhida = cartasJogador[cartaIndex]

		cartasJogador.splice(cartaIndex, 1)
		console.log(cartaIndex, cartaEscolhida, cartasJogador);
	}


	return (
		<>
			<div className='table'>

				<div className='player-table'>

					<div className='deck'>
						<img className='card-back' src="src/assets/verso-carta.png" alt="" />
					</div>

					<div className='game-area'>
						<div className='attributes'>
							<p>Força</p>
							<p>Defesa</p>
							<p>Inteligência</p>
							<p>Agilidade</p>
						</div>

						<img className='card-back' src="src/assets/verso-carta.png" alt="" />

					</div>

					<div className='score-board'>
						<h1>Placar</h1>
						<p className='score'>2</p>
					</div>

				</div>

				<div className='player-table'>

					<div className='deck'>
						<img
							className='card-back'
							onClick={comprarCarta}
							src="src/assets/verso-carta.png"
							alt=""
						/>
					</div>

					<div className='game-area'>
						<div className='attributes'>
							<p>Força</p>
							<p>Defesa</p>
							<p>Inteligência</p>
							<p>Agilidade</p>
						</div>

						<div className='card'>

							<img className='card-img' src="src/assets/barbaro.png" alt="" />

							<p className='card-name'>Bárbaro</p>

							<div className='card-attributes'>
								<p>Força: 200</p>
								<p>Defesa: 110</p>
								<p>Inteligência: 65</p>
								<p>Agilidade: 90</p>
							</div>

						</div>

					</div>

					<div className='score-board'>
						<h1>Placar</h1>
						<p className='score'>3</p>
					</div>
				</div>

			</div>
		</>
	)
}

export default Table