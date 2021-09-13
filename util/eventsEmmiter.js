const EventEmitter  = require('events');

class eventsManager extends EventEmitter {

    constructor(intervalTime){
        super();
        this.intervalTime = intervalTime;
        this.currentTime = 0;
    }

    //Checks availability after 1 second
    emitRoomCheckEvent(){

    const timer = setInterval(()=>{

        this.currentTime++;
        this.emit('status',this.currentTime);

        //Check if countdown has reached to the end
        if(this.currentTime === this.intervalTime){
            clearInterval(timer);
            this.emit('end');
        }

        //Check if the countdown ends in 2 seconds
        if(this.currentTime === this.intervalTime - 2){
            this.emit('end-soon');
        }

    },1000);

    }
}