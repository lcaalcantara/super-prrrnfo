import { useEffect, useState } from 'react'
import './Table.css'
import Modal from '../Modal/Modal';

const originalDeck = [
	{
		cardImg: "../super-trunfo/src/assets/barbaro.png",
		cardName: "Felpudo, o Bárbaro",
		strenght: 210,
		defense: 100,
		intelligence: 65,
		agility: 90
	},
	{
		cardImg: "../super-trunfo/src/assets/assassino.png",
		cardName: "Pantera, a Assassina",
		strenght: 130,
		defense: 75,
		intelligence: 80,
		agility: 190
	},
	{
		cardImg: "../super-trunfo/src/assets/bardo.png",
		cardName: "Bichano, o Bardo",
		strenght: 60,
		defense: 65,
		intelligence: 175,
		agility: 145
	},
	{
		cardImg: "../super-trunfo/src/assets/guerreiro.png",
		cardName: "Fofo, o Guerreiro",
		strenght: 170,
		defense: 155,
		intelligence: 85,
		agility: 85
	},
	{
		cardImg: "../super-trunfo/src/assets/ladino.png",
		cardName: "Mingau, o Ladino",
		strenght: 40,
		defense: 60,
		intelligence: 125,
		agility: 195
	},
	{
		cardImg: "../super-trunfo/src/assets/feiticeiro.png",
		cardName: "Mimi, a Feiticeira",
		strenght: 20,
		defense: 15,
		intelligence: 190,
		agility: 135
	},
	{
		cardImg: "../super-trunfo/src/assets/arqueiro.png",
		cardName: "Bob, o Arqueiro",
		strenght: 50,
		defense: 90,
		intelligence: 160,
		agility: 170
	},
	{
		cardImg: "../super-trunfo/src/assets/clerigo.png",
		cardName: "Fiona, a Clériga",
		strenght: 20,
		defense: 195,
		intelligence: 180,
		agility: 45
	},
	{
		cardImg: "../super-trunfo/src/assets/mago.png",
		cardName: "Bichento, o Mago",
		strenght: 20,
		defense: 15,
		intelligence: 210,
		agility: 35
	},
	{
		cardImg: "../super-trunfo/src/assets/mercenario.png",
		cardName: "Tigre, o Mercenário",
		strenght: 140,
		defense: 150,
		intelligence: 110,
		agility: 165
	},
	{
		cardImg: "../super-trunfo/src/assets/monge.png",
		cardName: "Pelado, o Monge",
		strenght: 160,
		defense: 110,
		intelligence: 145,
		agility: 195
	},
	{
		cardImg: "../super-trunfo/src/assets/paladino.png",
		cardName: "Pitito, o Paladino",
		strenght: 45,
		defense: 200,
		intelligence: 160,
		agility: 40
	}
]

function Table() {

	const [start, setStart] = useState();
	const [roundStart, setRoundStart] = useState();

	const [playerDeck, setPlayerDeck] = useState([])
	const [pcDeck, setPcDeck] = useState([])

	const [playerCard, setPlayerCard] = useState()
	const [pcCard, setPcCard] = useState()

	const [playerScore, setPlayerScore] = useState(0)
	const [pcScore, setPcScore] = useState(0)

	const [playerTurn, setPlayerturn] = useState(true)

	const [showModal, setShowModal] = useState(false)
	const [modalText, setModalText] = useState("")
	const [modalTitle, setModalTitle] = useState("")
	const [modalColor, setModalColor] = useState("")

	useEffect(() => {
		if (start) {
			handleShuffleDecks()
		}
	}, [start]);

	useEffect(() => {
		if (!playerTurn && roundStart) {
			const pcChoice = handlePcBestAttribute(pcCard);
			handleBetRound(pcChoice.attribute);
		}
	}, [playerTurn, roundStart]);

	function handleShuffleDecks() {
		const shuffledDeck = [...originalDeck].sort(() => Math.random() - 0.5);
		const playerDeck = shuffledDeck.slice(0, 6);
		const pcDeck = shuffledDeck.slice(6, 12);
		setPlayerDeck(playerDeck);
		setPcDeck(pcDeck);

		console.log(playerDeck, pcDeck)
		handleDrawCard();
	}

	function handleDrawCard() {

		if (!start) {
			setStart(true)
			return
		}

		if (roundStart) {
			// alert("Selecione o atributo para apostar nessa rodada")
			return
		}

		const selectedPlayerCard = handleCardSelect(playerDeck);
		const selectedPcCard = handleCardSelect(pcDeck);

		if (selectedPlayerCard.selectedCard && selectedPcCard.selectedCard) {
			setPlayerCard(selectedPlayerCard.selectedCard);
			setPlayerDeck(selectedPlayerCard.newDeck);

			setPcCard(selectedPcCard.selectedCard);
			setPcDeck(selectedPcCard.newDeck);
			setRoundStart(true);
		}

	}

	function handleCardSelect(deck) {
		if (deck.length === 0) {
			console.log("Deck vazio")

			setStart(false)

			return { selectedCard: "", newDeck: [] }
		}

		const cardIndex = Math.floor(Math.random() * deck.length)
		const selectedCard = deck[cardIndex]
		const newDeck = deck.filter((_, index) => index !== cardIndex)

		setRoundStart(true)

		return { selectedCard, newDeck }
	}

	function handlePcBestAttribute(card) {

		const attributes = ['strenght', 'defense', 'intelligence', 'agility']

		let bestAttribute = attributes[0]
		let bestValue = 0

		for (let i = 1; i < attributes.length; i++) {
			let attribute = attributes[i]
			if (card[attribute] >= bestValue) {
				bestAttribute = attribute
				bestValue = card[attribute]
			}
		}

		return { attribute: bestAttribute, value: bestValue }
	}

	function handleBetRound(attName) {
		const playerResult = playerCard[attName]
		const pcResult = pcCard[attName]

		console.log(`O atributo escolhido foi: ${attName}`);

		if (playerResult > pcResult) {

			setShowModal(true)
			setModalText(`Você venceu! ${playerResult} contra ${pcResult}`)
			setModalTitle(`Atributo escolhido: ${handleTranslateAttribute(attName)}`)
			setModalColor('green')

			setPlayerScore(playerScore + 1)

		} else if (pcResult > playerResult) {

			setShowModal(true)
			setModalText(`O PC venceu! ${pcResult} contra ${playerResult}`)
			setModalTitle(`Atributo escolhido: ${handleTranslateAttribute(attName)}`)
			setModalColor('red')

			setPcScore(pcScore + 1)

		} else {

			setShowModal(true)
			setModalText(`Empate! ${playerResult} contra ${pcResult}`)
			setModalTitle(`Atributo escolhido: ${handleTranslateAttribute(attName)}`)
			setModalColor('yellow')

		}

		setRoundStart(false)
		setPlayerturn(!playerTurn)

		if (playerDeck.length === 0) {
			if (pcScore > playerScore) {

				setShowModal(true)
				setModalTitle(`Derrota`)
				setModalText(`Você perdeu! Mais sorte na próxima!`)
				setModalColor('red')

			} else if (playerScore > pcScore) {
				setShowModal(true)
				setModalTitle(`Vitória`)
				setModalText(`Você venceu! Meus parabéns!`)
				setModalColor('green')

			} else {
				setShowModal(true)
				setModalTitle(`Empate`)
				setModalText(`Empatou! Vamos jogar de novo?`)
				setModalColor('yellow')
			}

			setStart(false)
			setPlayerScore(0)
			setPcScore(0)
			return
		}
	}

	function handleTranslateAttribute(att) {
		if (att === "strenght") {
			return "Força"
		} else if (att === "defense") {
			return "Defesa"
		} else if (att === "intelligence") {
			return "Inteligência"
		} else if (att === "agility") {
			return "Agilidade"
		}
	}

	return (
		<>
			{showModal &&
				<Modal
					showModal={showModal}
					setShowModal={setShowModal}
					modalText={modalText}
					modalTitle={modalTitle}
					modalColor={modalColor}
				/>}
			<div className='table'>

				<div className='player-table'>

					<div className='deck'>
						<img className='card-back' src="../super-trunfo/src/assets/verso-carta.png" alt="" />
					</div>

					<div className='game-area'>
						<div className='attributes'>
							<span>Força</span>
							<span>Defesa</span>
							<span>Inteligência</span>
							<span>Agilidade</span>
						</div>

						{(start && !roundStart) &&
							<div className='card'>

								<img className='card-img' src={pcCard && pcCard.cardImg} alt="" />

								<span className='card-name'>{pcCard && pcCard.cardName}</span>

								<div className='card-attributes'>
									<span>{pcCard && `Força: ${pcCard.strenght}`}</span>
									<span>{pcCard && `Defesa: ${pcCard.defense}`}</span>
									<span>{pcCard && `Inteligência: ${pcCard.intelligence}`}</span>
									<span>{pcCard && `Agilidade: ${pcCard.agility}`}</span>
								</div>
							</div>
						}

						{(start && roundStart) &&
							<img className='card-back' src="../super-trunfo/src/assets/verso-carta.png" alt="" />
						}

						{(!start && !roundStart) &&
							<div className='card-back'> </div>
						}

					</div>

					<div className='score-board'>
						<h1>Placar</h1>
						<span className='score'>{pcScore}</span>
					</div>

				</div>

				<div className='player-table'>

					<div className='deck'>
						<img
							className='card-back player'
							onClick={start ? handleDrawCard : handleShuffleDecks}
							src="../super-trunfo/src/assets/verso-carta.png"
							alt=""
						/>
					</div>

					<div className='game-area'>
						<div className='attributes player'>
							<span onClick={() => roundStart && playerTurn && handleBetRound("strenght")}>Força</span>
							<span onClick={() => roundStart && playerTurn && handleBetRound("defense")}>Defesa</span>
							<span onClick={() => roundStart && playerTurn && handleBetRound("intelligence")}>Inteligência</span>
							<span onClick={() => roundStart && playerTurn && handleBetRound("agility")}>Agilidade</span>
						</div>

						{start &&
							<div className='card'>

								<img className='card-img' src={playerCard && playerCard.cardImg} alt="" />

								<span className='card-name'>{playerCard && playerCard.cardName}</span>

								<div className='card-attributes'>
									<span>{playerCard && `Força: ${playerCard.strenght}`}</span>
									<span>{playerCard && `Defesa: ${playerCard.defense}`}</span>
									<span>{playerCard && `Inteligência: ${playerCard.intelligence}`}</span>
									<span>{playerCard && `Agilidade: ${playerCard.agility}`}</span>
								</div>
							</div>
						}

						{!start &&
							<div className='card-back'> </div>
						}

					</div>

					<div className='score-board'>
						<h1>Placar</h1>
						<span className='score'>{playerScore}</span>
					</div>
				</div>

			</div >
		</>
	)
}

export default Table