import './Form.css'
import { useState } from 'react'


const Form = () => {
    const [text, setText] = useState('');
    const [select, setSelect] = useState('pt-BR-1');
    const voices_arr = [
        {key:"pt-BR-1", name:"Feminina 1"}, 
        {key:"pt-BR-4", name: "Feminina 2"},
        {key:"pt-BR-2", name: "Masculina 1"},
        {key:"pt-BR-3", name:"Masculina 2"}
    ]
    const voices = voices_arr.map((props) =>
        <option value={props.key}>{props.name}</option>
    )
    const url = 'https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize';
    const convert = async () => {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '5cd3a1bacbmshc8a7afb13c05feep1039a2jsnecd0b541b59c',
                'X-RapidAPI-Host': 'cloudlabs-text-to-speech.p.rapidapi.com'
            },
            body: new URLSearchParams({
                voice_code: select,
                text: text,
                speed: '0.85',
                pitch: '1.00',
                output_type: 'audio_url'
            })
        };
        const response = await fetch(url, options);
        const result = await response.text();
        const arr = JSON.parse(result)
        return window.open(arr.result.audio_url)
    }
    
    return (
        <section className='container'>
            <div className='form'>
                <p>Escreva o texto para ser reproduzido:</p>
                <textarea id="tts_text" name="text" rows="10" cols="60" value={text} onChange={(e) => setText(e.target.value)}></textarea>                
                <div id='dropdown'>
                    <label for='voice'>Escolha uma voz:</label>
                    <select name='voices' id='voices' onChange={(e) => setSelect(e.target.value)}>
                        {voices}                    
                    </select>                
                </div>
                <div id='btn'>
                    <button id='tts_submit' onClick={convert}>Enviar</button>
                </div>
            </div>
        </section>
    )
}

export default Form