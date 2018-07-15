import React, { Component } from 'react';
import "./css/bootstrap.css";
import "./css/hover-min.css";
import "./css/style.css";
import "./css/font-awesome-4.7.0/css/font-awesome.min.css";

// web client can't read from directories so we'll hard-code this
const images = [
    "images/tops/tops_000.png",
    "images/tops/tops_001.png",
    "images/tops/tops_002.png",
    "images/tops/tops_003.png",
    "images/tops/tops_004.png",
    "images/tops/tops_005.png",
    "images/tops/tops_006.png",
    "images/tops/tops_007.png",
    "images/tops/tops_008.png",
    "images/tops/tops_009.png",
    "images/tops/tops_010.jpg",
    "images/tops/tops_011.jpg",
    "images/tops/tops_012.jpg",
    "images/tops/tops_013.jpg",
    "images/tops/tops_014.jpg",
    "images/tops/tops_015.jpg",
    "images/tops/tops_016.jpg"
]

class GetScrollOuterTops extends Component {

    constructor(props) {
        super(props);
        this.currentImageIndex = 0;
        this.currentImage = images[this.currentImageIndex];
        // This binding is necessary to make `this` work in the callback
        this.previousItem = this.previousItem.bind(this);
        this.nextItem = this.nextItem.bind(this);
        this.item = { selected: this.currentImage };
        var t = 0;
    }

    getItem() {
        this.item = { selected: this.currentImage };
        return this.item;
    }
    nextItem() {
        if (this.currentImageIndex == (images.length - 1)) {
            this.currentImageIndex = 0;
        }
        else {
            this.currentImageIndex = this.currentImageIndex + 1;
        }
        this.currentImage = images[this.currentImageIndex];
        this.forceUpdate();
    }
    previousItem() {
        if (this.currentImageIndex == 0) {
            this.currentImageIndex = images.length - 1;
        }
        else {
            this.currentImageIndex = this.currentImageIndex - 1;
        }
        this.currentImage = images[this.currentImageIndex];
        this.forceUpdate();
    }


    render() {

        return (

            <div className="scroll-outer-tops">

                <img src="images/chevronleft.png" className="prevTop" alt="Prev" onClick={this.previousItem}></img>
                <div className="scroll-inner-tops">
                    <img src={this.currentImage} className="activeTop"></img>
                </div>
                <img src="images/chevronright.png" className="nextTop" alt="Next" onClick={this.nextItem}></img>
            </div>
        );
    }
}

export default GetScrollOuterTops;
