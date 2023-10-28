//You can pass request attributes as a first parameter if they are optional  optional 
export default function allAttributesExist(subSet:string[] , superSet:string[]):boolean{
    if(!subSet)return true
    return  subSet.every((attribute)=> superSet.includes(attribute))        
}

export function someAttributesExist(subSet:string[] , superSet:string[]):boolean{
    if(!subSet) return true
    return subSet.some((attribute)=> superSet.includes(attribute))        
}