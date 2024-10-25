import {test,expect} from '@playwright/test'
const locatorText = require('../data/locatorText.json')
const data = require('../data/data.json')
const {executeStep}= require('../utils/action')


exports.BookCartHomePage = class BookCartHome {
    constructor(page,test){
        this.page= page;
        this.test = test;
        this.inputFieldWithPlaceholder= (text) =>  page.locator(`input[placeholder="${text}"]`)
    
    }
    navigateToBookCartHomePage= async()=>{
        await executeStep(
            this.test,
            this.page,
            'navigate',
            `Navigating to Book cart websites`,'./'
          );
    
    }
    searchBookOrAuthor = async()=>{
        await executeStep(this.test,this.inputFieldWithPlaceholder(locatorText.homePage.searchPlacehoderText),'click','clicking on search input field')
        await executeStep(this.test,this.inputFieldWithPlaceholder(locatorText.homePage.searchPlacehoderText),'fill',`seacrhing for book `,data.Book1)
        // await this.inputFieldWithPlaceholder(data.homePage.searchPlacehoderText).click()
    }

}