const { Router } = require( "express" );
const { fileUpload, fileDelete } = require( "../controllers/file.controller" );


const { setPermissions, upload, checkAuth } = require( "../middlewares/middlewares" );

const router = Router();

router.post( "/upload", upload, fileUpload );
router.delete( "/delete", checkAuth, setPermissions( [ "admin" ] ), fileDelete );

module.exports = {
    fileRouter: router,
};
