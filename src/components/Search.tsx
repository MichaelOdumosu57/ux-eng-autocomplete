
import React, { useState, useEffect, ChangeEvent } from "react";
import { Pane, SearchInput,Heading,Strong,Text } from "evergreen-ui";
import useQuery,{Output} from "../hooks/use-query"
import { Item } from "../data/index"
import {SamePropTypeOnly} from '../lib'

interface Props { }


const Search: React.FC<Props> = () => {


	// css vars if you will
	let eDB:string ="1px solid #E6E8F0" // evergreenDefaultBorder becuase I could not get the defaults on borderBottom only
	// 

	// gather end user input data
	let [value, setValue]:[string,Function] = useState<string>("")	
	let data:Output =  useQuery({ query: "" })
	let results: SamePropTypeOnly<Item[]> = {}
	// 

	let input = {
		onChange: (e: ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value);
		}
	}

	// your code here!
	return (
		<Pane border="default" height="auto" display="flex" flexDirection="column" borderRadius="10px">

			<SearchInput width={540} placeholder="" onChange={input.onChange} />
			{
				(()=>{

					results = {}
					// if the data is not available due to networking issues reurn
					if(data.data === null){
						return
					}
					if((data.data as {status:number}).status === 404){
						return
					};
					//  

					(data.data as Item[])?.map((item: Item, i) => {

						
						if (["source", "destination"].includes(item.category)) {
							item.category += "s"
						}
						if( item.name.toLowerCase().includes(value.toLowerCase())){
							if (results[item.category] === undefined) {
								results[item.category] = []
							}
							results[item.category].push(item)
						}
						
					})

					return Object.entries(results).map((x, i) => {
						let category: string = x[0]
						let items: Item[] | any[] = x[1]
						return <Pane  >
		
							<Pane borderBottom={eDB}>
								<Heading margin="0" paddingTop="20px" paddingLeft="20px" >{category.toUpperCase()}</Heading>
							</Pane>
							{
								items.map((item, y) => {
									let imgDims: string = "30px"
									return <Pane display="flex" alignItems="center"  borderBottom={eDB}>
										{item.imgUrl && <img style={{ height: imgDims, width: imgDims, margin: "10px 10px 10px 25px" }} src={item.imgUrl} />}
										<Pane display="flex" flexDirection="column" paddingX={!item.imgUrl ? "25px" : "5px"} paddingY={!item.imgUrl ? "15px" : "5px"}>
											<Strong margin="0">{item.name}</Strong>
											{/* for scalalbility instead of a simple equals add targets to the array */}
											{["sources"].includes(item.category) && <Text >{item.type}</Text>}
											{["destinations"].includes(item.category) && <Text >Receiving From {item.connectedTo.name}</Text>}
										</Pane>
									</Pane>
								})
							}
						</Pane>
					})

					
				})()
			
			}
		</Pane>
	);
};

export default Search;
