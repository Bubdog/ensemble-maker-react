import React, { Component } from 'react';
import { render } from 'react-dom';
import "./css/bootstrap.css";
import "./css/hover-min.css";
import "./css/style.css";
import "./css/font-awesome-4.7.0/css/font-awesome.min.css";

import GetScrollOuterTops from './GetScrollOuterTops';
import GetScrollOuterBottoms from './GetScrollOuterBottoms';
import GetScrollOuterShoes from './GetScrollOuterShoes';

const GetSavedEnsembles = () => {
  // This gets the local storage for ensembles
  var savedJsons = localStorage.getItem("SavedEnsembles");
  return JSON.parse(savedJsons); // contains the 'ensembles' array
  // 'ensembles' array[] =
  //     { "id" : 1, "top": ensemble 0 top file name here, "bottoms": ensemble 0 bottoms file name here, "shoes" : ensemble 0 shoes file name here}
  //      ...
  //     { "id" : N, "top": ensemble N top file name here, "bottoms": ensemble N bottoms file name here, "shoes" : ensemble N shoes file name here}           
};

const SaveEnsemble = (top, bottom, shoes) => {
  var topImageSrc = top;
  var bottomsImageSrc = bottom;
  var shoesImageSrc = shoes;
  // Use this syntax to get just the pathname: var filename = topImageSrc.replace(/^.*[\\\/]/, '')
  var ensembleImageFiles = [{ "id": 1, "top": topImageSrc, "bottoms": bottomsImageSrc, "shoes": shoesImageSrc }];

  // Check if we have any "SavedEnsembles" in local storage
  if (localStorage.getItem("SavedEnsembles") === null) {
    // since there is no local storage for ensembles we need to create it
    var localSaves = {
      ensembles: []
    };

    ensembleImageFiles.map(function (item) {
      localSaves.ensembles.push({
        "id": item.id,
        "top": item.top,
        "bottoms": item.bottoms,
        "shoes": item.shoes
      });
    });
    var ensembleImageJsons = JSON.stringify(localSaves);
    localStorage.setItem("SavedEnsembles", ensembleImageJsons);
  }
  else {
    // Get ensembles from local storage so we can add to it and push it back
    var savedEnsembles = GetSavedEnsembles(); // contains the 'ensembles' array

    // Get the last "id" so that we can increment it for the next save
    var ensembleId = 1;
    var duplicateSave = false;
    var item = "";
    for (item in savedEnsembles.ensembles) {
      ensembleId = parseInt(savedEnsembles.ensembles[item].id, 10);
      var storedTop = savedEnsembles.ensembles[item].top.replace(/^.*[\\\/]/, '');
      var storedBottoms = savedEnsembles.ensembles[item].bottoms.replace(/^.*[\\\/]/, '');
      var storedShoes = savedEnsembles.ensembles[item].shoes.replace(/^.*[\\\/]/, '');
      var shoesToStore = shoesImageSrc.replace(/^.*[\\\/]/, '');
      var bottomsToStore = bottomsImageSrc.replace(/^.*[\\\/]/, '');
      var topToStore = topImageSrc.replace(/^.*[\\\/]/, '');

      if ((storedTop == topToStore) && (storedBottoms == bottomsToStore) && (storedShoes == shoesToStore)) {
        duplicateSave = true;
        break;
      }
    }

    if (duplicateSave) {
      // if you want to alert the operator that a duplicate save was attempted then do it here
      //alert("duplicate");
      return false;
    }
    // Now add the current ensemble to the Json array just pulled from local storage along with the incremented "id"
    ensembleImageFiles.map(function (item) {
      savedEnsembles.ensembles.push({
        "id": ensembleId + 1,
        "top": item.top,
        "bottoms": item.bottoms,
        "shoes": item.shoes
      });
    });
    // now over-write localstorage with the Json object containing the added ensemble
    ensembleImageJsons = JSON.stringify(savedEnsembles);
    localStorage.setItem("SavedEnsembles", ensembleImageJsons);
  }
}

const I = _class => {
  return React.createElement("i", { className: _class, "aria-hidden": "true" }, null)
}

const A = (_href, _class, _text) => {
  return React.createElement("a", { className: _class, href: _href }, _text, I("fa fa-arrow-right hvr-icon"))
}

const ShowEnsembles = () => {
  var closet = JSON.parse(localStorage.getItem("SavedEnsembles"));
  let collectionsDivText = "";
  // this gets all the saved apparel but we aren't using this yet
  var index;
  var upper;
  var lower;
  var skids;
  var outfitId;
  for (index in closet.ensembles) {
    upper = closet.ensembles[index].top;
    lower = closet.ensembles[index].bottoms;
    skids = closet.ensembles[index].shoes;
    outfitId = closet.ensembles[index].id;

    collectionsDivText += '<div class="saved-outfit">';

    collectionsDivText += '<div class="saved-top">';
    collectionsDivText += '<img src="' + upper + '" alt="top"></img>';
    collectionsDivText += '</div>';

    collectionsDivText += '<div class="saved-bottom">';
    collectionsDivText += '<img src="' + lower + '" alt="bottom"></img>';
    collectionsDivText += '</div>';

    collectionsDivText += '<div class="saved-shoes">';
    collectionsDivText += '<img src="' + skids + '" alt="shoes"></img>';
    collectionsDivText += '</div>';

    collectionsDivText += '<a  href="javascript:deleteOutfit(' + outfitId + ')" class="remove hvr-shutter-in-vertical"><i class="fa fa-times"  id="deleteOutfit" aria-hidden="true"></i> Remove from Closet</a>';

    collectionsDivText += '</div>';
  }
  var i = 1; // this is just here to put a breakpoint
  return collectionsDivText;


};

class App extends Component {

  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.viewCloset = this.viewCloset.bind(this);
    this.saveEnsemble = this.saveEnsemble.bind(this);
    this.viewWizard = this.viewWizard.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.top = React.createRef();
    this.bottom = React.createRef();
    this.shoes = React.createRef();
    this.clothing = GetSavedEnsembles();
    if (this.clothing) {
      this.state = { items: this.clothing.ensembles }
    }
    this.showCloset = false;
    this.ensembles = "";
  }

  viewWizard() {
    this.showCloset = false;
    this.forceUpdate();
  }
  viewCloset() {
    //this.ensembles = ShowEnsembles();
    this.showCloset = true;
    this.forceUpdate();
  }
  saveEnsemble() {
    let upper = this.top.current.getItem().selected;
    let lower = this.bottom.current.getItem().selected;
    let skids = this.shoes.current.getItem().selected;
    SaveEnsemble(upper, lower, skids);
  }
  deleteItem(outfitId) {
    //alert("Delete Outfit.id: " + outfitId);

    var idToDelete = parseInt(outfitId);
    var closet = JSON.parse(localStorage.getItem("SavedEnsembles"));
    var localSaves = { ensembles: [] };
    var index;
    var id;
    var storedId;
    var upper;
    var lower;
    var skids;

    for (index in closet.ensembles) {

      id = closet.ensembles[index].id;
      storedId = parseInt(id);
      if (storedId != idToDelete) {
        upper = closet.ensembles[index].top;
        lower = closet.ensembles[index].bottoms;
        skids = closet.ensembles[index].shoes;

        localSaves.ensembles.push({
          "id": id,
          "top": upper,
          "bottoms": lower,
          "shoes": skids
        })
      }
    }
    // now over-write localstorage with the Json object containing the added ensemble
    var ensembleImageJsons = JSON.stringify(localSaves);
    localStorage.setItem("SavedEnsembles", ensembleImageJsons);
    this.clothing = GetSavedEnsembles();
    this.state = { items: this.clothing.ensembles }
    this.viewCloset();

  }
  render() {
    if (this.showCloset == false) {
      return (
        <div className="container horizontal_container">

          {React.createElement("h1", null, "Pick out your ensemble!")}
          {React.createElement("p", null, "Here you can scroll through your various articles of clothing and see what comes together best!")}

          <a className="backto right hvr-icon-wobble-horizontal" onClick={() => this.viewCloset()}	>View Saved Collection <i className="fa fa-arrow-right hvr-icon" aria-hidden="true"></i></a>
          <GetScrollOuterTops ref={this.top} />
          <GetScrollOuterBottoms ref={this.bottom} />
          <GetScrollOuterShoes ref={this.shoes} />
          <a className="saveEnsemble" onClick={this.saveEnsemble}><i className="fa fa-check" aria-hidden="true"></i> Save This Outfit</a>

        </div>
      );
    }
    else {
      let savedItems = GetSavedEnsembles();
      if (savedItems == null) {
        return (
          <div className="container horizontal_container">

            {React.createElement("h1", null, "Your Ensemble Closet")}
            {React.createElement("p", null, "Here you have all of your outfits that you have saved. Imagine this to be your virtual closet!")}
            <a className="backto right hvr-icon-wobble-horizontal" onClick={this.viewWizard}><i className="fa fa-arrow-left hvr-icon" aria-hidden="true"></i>Go back to Ensemble Maker</a>
          </div>
        )
      }
      else {
        let items = savedItems.ensembles;

        return (
          <div className="container horizontal_container">

            {React.createElement("h1", null, "Your Ensemble Closet")}
            {React.createElement("p", null, "Here you have all of your outfits that you have saved. Imagine this to be your virtual closet!")}
            <a className="backto right hvr-icon-wobble-horizontal" onClick={this.viewWizard}><i className="fa fa-arrow-left hvr-icon" aria-hidden="true"></i>Go back to Ensemble Maker</a>

            <div className="closet" id="collections">
              {items.map((item, i) =>
                <div key={i} className="saved-outfit">
                  <div className="saved-top">
                    <img src={item.top} alt="top"></img>
                  </div>

                  <div className="saved-bottom">
                    <img src={item.bottoms} alt="bottoms"></img>
                  </div>

                  <div className="saved-shoes">
                    <img src={item.shoes} alt="shoes"></img>
                  </div>
                  <a key={item.id} onClick={this.deleteItem.bind(this, item.id)} className="remove hvr-shutter-in-vertical">
                    <i className="fa fa-times" id="deleteitem" aria-hidden="true"></i> Remove from Closet</a>

                </div>
              )}
            </div>

          </div>
        );
      }
    }
  }
}

export default App;