import React from 'react';

const TestHardware = (props) => {
    
    // get user's hardware information from server
    const userHW = {CPU: 'userCPU', GPU: 'userGPU', Ram: 8, storage: 256};

    const handleFormChange = (e) => {
        // ask server whether the game is playable 
    }

    return(<div className={props.showTHW ? "game-THW" : "game-THW hidden"}>

        <h3>Your Hardware:&nbsp;</h3>
        <form onChange={handleFormChange}>
            <label for="THW-CPU">CPU:&nbsp;</label>
            <select id="THW-CPU" name="cpu">
                <option value="" selected>{userHW.CPU}</option>
                <option value=""> sample CPU 1</option>
                <option value=""> sample CPU 2</option>
                <option value=""> sample CPU 3</option>
            </select> <br/>
        
            <label for="THW-GPU">GPU:&nbsp;</label>
            <select id="THW-GPU" name="gpu">
                <option value="" selected>{userHW.GPU}</option>
                <option value=""> sample GPU 1</option>
                <option value=""> sample GPU 2</option>
                <option value=""> sample GPU 3</option>
            </select> <br/>

            <label for="THW-Ram">Ram:&nbsp;</label>
            <select id="THW-Ram" name="ram">
                <option value="" selected>{userHW.Ram} GB</option>
                <option value="4"> 4 GB </option>
                <option value="8"> 8 GB</option>
                <option value="16"> 16 GB</option>
            </select>

        </form>

        <h3>Your Computer can Run this game!</h3>

        <button onClick={props.close}>Close</button>
        
    </div> );
}

export default TestHardware;