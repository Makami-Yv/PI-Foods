// Importamos los controllers y dependencias necesarias
const { Router } = require("express");
const { 
    getAllDiets,
    } = require ('../controllers/dietController')

const dietRouter = Router();

// Configuramos los Routers
    // GET
    dietRouter.get('/', async (req, res) => {
        try {
            const response = await getAllDiets()
            return res.status(200).send(response)

        } catch (error) {
            console.error(error)
            return res.status(400).send("There's no Recipe to show right now")
        }
    });

module.exports = dietRouter;