/**
 * Calculate the EUR price of 1 gram gold
 * formula: usdeur/(usdxau * ounceToGrammsRatio)
 * @param {float} UsdGoldOunce
 * @param {float} UsdEurRate
 */
function calculateGoldGrammPriceToEur(UsdGoldOunce, UsdEurRate) {
    return ((UsdEurRate / (UsdGoldOunce * 31.1034768)) * 1.33).toFixed(2);
}

/**
 * Calculate the USD price of 1 gram gold + 30%
 * formula: (GrammsToOunceRatio/usdxau)*1.33
 * @param {float} UsdGoldOunce
 */
function calculateGoldGrammPriceToUsd(UsdGoldOunce) {
    return ((0.0321507 / UsdGoldOunce) * 1.33).toFixed(2);
}
/**
 * Calculate the USD price of 1 ounce gold
 * formula: 1 / usdxau
 * @param {float} UsdGoldOunce
 * @param {float} UsdEurRate
 */
function calculateGoldPriceOunceUsd(UsdGoldOunce) {
    return (1 / UsdGoldOunce).toFixed(2)
}
/**
 * Calculate the EUR price of 1 ounce gold
 * formula: usdeur *(1 / usdxau)
 * @param {float} UsdGoldOunce
 * @param {float} UsdEurRate
 */
function calculateGoldPriceOunceEur(UsdGoldOunce, UsdEurRate) {
    return (UsdEurRate * ((1 / UsdGoldOunce))).toFixed(2);
}

/**
 * Set gold price in EUR / Gramm (TODO from API)
 *
 * In order not to do unnecessary requests;
 * only if the gold_val_g html element value is empty get the price from the API.

 * json data for usd gold and usd eur rates
 *
 *
 {
            "timestamp": 1593429300,
            "base": "USD",
            "rateEUR": 0.886546,
            "rateXAU": 5.6422E-4
        }
 */
function setGoldPriceEurGramm(rates) {

    let UsdGoldOunce = rates.rateXAU;
    let UsdEurRate = rates.rateEUR;

    console.log('UsdGoldOunce :'+rates.rateXAU);
    console.log('UsdEurRate :'+ UsdEurRate);
    gramEurPrice = calculateGoldGrammPriceToEur(UsdGoldOunce, UsdEurRate);
    ounceEurPrice = calculateGoldPriceOunceEur(UsdGoldOunce, UsdEurRate)
    gramUsdPrice = calculateGoldGrammPriceToUsd(UsdGoldOunce)
    ounceUsdPrice = calculateGoldPriceOunceUsd(UsdGoldOunce)
    $("span#usd-ounce").html(ounceUsdPrice);
    $("span#usd-gram").html(gramUsdPrice);
    $("span#eur-ounce").html(ounceEurPrice);
    $("span#eur-gram").html(gramEurPrice);
}

$(document).ready(function () {
    //var Stomp = require('@stomp/stompjs');
    let baseurl = "ticker.novemgold.com";
    //using rest for initial update
    $.ajax({
        url: "https://" + baseurl + "/initialrates",
        success: function (message) {
            setGoldPriceEurGramm(message);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }
    });
    //websocket
    let url = "wss://" + baseurl + "/ticker/websocket";
    let client = Stomp.client(url);
    client.connect({}, function(frame) {
        //setConnected(true);
        console.log('Connected: ' + frame);
        client.subscribe('/topic/prices', function(message) {
            setGoldPriceEurGramm(JSON.parse(message.body));
        });
    })
});