import {test,expect} from '@playwright/test'
const BookCartHomePage= require('../pages/bookCartHomePage')

test('Book Cart home Page ',async({page})=>{
  //*We have to pass the page and test 
  const bookCartHomePage = new BookCartHomePage(page,test)
  await bookCartHomePage.navigateToBookCartHomePage(page)
  await bookCartHomePage.searchBookOrAuthor(page)
    
})


test.skip('Book Cart home API testing  ',async({request})=>{
  const response  = await request.get(`https://bookcart.azurewebsites.net/api/Book`);
  console.log("response",response)
  console.log("------------------------------------------")
  console.log("status",response.status())
  console.log("------------------------------------------")
  console.log("response",JSON.stringify(response))


})