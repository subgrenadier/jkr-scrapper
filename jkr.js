const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const TenderDB = require('./models/tender');
const log = require('./log');

require('dotenv').config();

const HOME_URL = process.env.JKR_HOMEURL;
const TENDER_URL = process.env.JKR_TENDERURL;

let browser = null;
let page = null;

const jkr = {

    initialize: async () => {
        log.status('Initializing')
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto(HOME_URL);
        log.status(`Opening ${HOME_URL} 🏠 success!`);
    },

    scrapping: async (muka) => {
        URL = `${HOME_URL}?offset=${muka.toString()}`;
        await page.goto(URL);
        log.status(`Scrapping Page ${muka} 📑`);

         // scrapping main tender page
        let scrapTender = [];
        await page.waitForSelector('div#footer');
        try {
            let tenderArray = await page.$$('table[class="mt1"] > tbody > tr');
            tenderArray = tenderArray.slice(1,21)
            for (let tender of tenderArray) {

                //scrapping each row of table
                try {
                    let date = await tender.$eval('table[class="mt1"] > tbody > tr > td', e => e.innerText.trim());
                    let title = await tender.$eval('table[class="mt1"] > tbody > tr > td > div > a', e => e.innerText.trim());
                    let url = await tender.$eval('table[class="mt1"] > tbody > tr > td > div > a', e => e.getAttribute("href")); // "t_listdtl.asp?No_Proj=25938"
                    let tenderurl = `${TENDER_URL}${url}`;
                    scrapTender.push({
                        date,
                        title,
                        tenderurl,
                    });
                } catch(e) {
                    log.status(`Error: ${e.message}`);
                }
            }
                //scrapping individual tender row log.status('Scrapping each 🎬 movies');
            for (var j = 0; j < scrapTender.length; j++) {
                try {
                    await page.goto(scrapTender[j].tenderurl, { waitUntil: 'domcontentloaded' });
                    await page.waitForSelector('div#footer');

                    let sitevisit = await page.$eval('#contents > table > tbody > tr > td > table > tbody > tr > td > form > table:nth-child(3) > tbody > tr:nth-child(3) > td:nth-child(2)', e => e.innerText.trim());

                    

                } catch (e) {
                    log.status(`Error: ${e.message}`);
                }
            }
    } catch (e) {
        log.status(`Error: ${e.message}`)
    }
},

    end: async () => {
        await browser.close();
    }
};

module.exports = jkr;