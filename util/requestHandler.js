const _ = require('lodash');

class RequestHandler {

	constructor(logger) {
		this.logger = logger;
	}


	sendSuccess(res, message, status) {
		this.logger.log(`a request has been made and proccessed successfully at: ${new Date()}`, 'info');
			if (_.isUndefined(status)) {
				status = 200;
			}
			let resF ={};
			resF.message = message || 'Success result';
			resF.success = true;
			resF.data = res.body;
			resF.status = status;
			return res.status(status).send(resF);
	}


	sendError(req, res, error) {
		var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        this.logger.log(`error ,Error during processing request route : ${`${fullUrl}`} details message: ${error.message || error}`, 'error');
        res.contentType = 'json';
        let resbody =  {
            type: 'error', 
            message: error.message || error.message || error ||'Unhandled Error',
            error:error.error
            }
		return res.status(error.status || 500).send(resbody);
	}


}


module.exports = RequestHandler;

