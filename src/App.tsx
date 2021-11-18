import React from 'react';
import './App.scss';
import {Header} from "./componets/Header";
import {Main} from "./componets/Main";
import {Footer} from "./componets/Footer";
import {Card} from "./componets/Card";
import useFetch from "./hooks/useFetch";
import {ICharacter} from "./types/character";
import {Toggle} from "./componets/Toggle";

function App() {
    const { data, error, } = useFetch<{ results:ICharacter[] }>('https://swapi.dev/api/people/')
    return (<>
            <Header/>
            <Main>
                <ul className={'card-list'}>
                    {data?.results.map(({name,height}: ICharacter) => <Card key={name} name={name} height={height}/>)}
                    {!data && <p className={'loading'}>Loading...</p>}
                </ul>
            </Main>

            <Footer>
                <Toggle/>
            </Footer>               <Footer/>
        </>
    )
}

export default App;
