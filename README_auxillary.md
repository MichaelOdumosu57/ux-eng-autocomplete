# Results 

* The UI should fetch and display grouped data that comes back from the API
    * the UI fetches the data and groups accordingly to the filter logic from use-query.ts providing for categories and its associated items
* The UI is performant and doesnt put too much load on our backend systems
    * instead of calling useQuery every time and user input a value if the data from the backend is static we need to call useQuery once and leave the data in-memory in the application to filter from
* The Search Component is easily extensible and moduler
    * the jsx is structured from a results object with keys as categories and values as Item[], in this setup there can be any amount of items added to a categories and any select amount of categories to be added and removed
    * if the category is removed there we be no respective property on the results object to be rendered to jsx
    * if the query is not a substring on any item.names, then the category will not be rendered to jsx
* We should have an appropriate empty state for a 0 result set for the API
    * if the query is not a substring on any item.names, then the categories in addition will not be rendered to jsx
    * categories only render if the query is a substring of any of its item.names
* The Search component should be resilient to things like network error, user error, etc.
    * We make one API per page visit not to bother the backend, if that call fails we provide for an implicit conditional by taking advantage of Promise.reject and the dependency to make the useQuery custom hook retry XHR to the endpoint until it gets the data sucessfully 
    *  There should not be an instance where the user types anything that causes the frontend to misbehave in terms of static flutter, or a apparent break in functinonality

# Notes


* The UI should fetch and display grouped data that comes back from the API
    * I am able to achieve the task
* The UI is performant, and doesn't put too much load on our backend systems.
    * instead of useQuery continually making a backend call since the data is static 
        * provide for HTTP caching
        * grab the data once and leave in memory in the app state
        * empty the dependency array and modify the jsx based on the changes to value
    * I use the dependency array with value so only the API is called with changes to the value
        * however useQuery has its own useEffect which will update data regardless
        * so its is similar to rxjs Subscriptions but in addition variables have the ability to get updated
            I should have access to the latest changes via virtual DOM and global state data structure features of Rea
        
* The Search component is easily extensible and modular.
    * according to the data soruces, we can remove and add categories and the Search component can handle it accordingly 
        because all a category is is a key in an object the Search Component uses to construct jsx and if there is no key, no need to create its respective jsx
* We should have an appropriate empty state for a 0 result set from our API.
    * so instead of providing the current value of the input for useQuery, we can provide an empty string to retrieve all the data when we have the 
    let the client code do the filtering according the the filter fn in use-query.ts
* The Search component should be resilient to things like network error, user error, etc.
    * we make one API call we should check if that one API call is successfull else retry
    * I modifed the useQuery function call change if the Promise reject, by providing the success var for useEffect in the dependency Array
        it would only change in the catch callback, once the then callback it would never change again


