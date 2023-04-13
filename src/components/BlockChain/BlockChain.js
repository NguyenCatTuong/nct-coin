import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Block from "../Block/Block";
import './BlockChain.css'

function BlockChain(props) {
    const {blocks} = props;

    function showBlockChain (blocks) {
        let result = [];
        for(let i = blocks.length - 1; i >= 0; i--){
            result.push(
                <Block 
                    key={blocks[i].id} 
                    name={blocks[i].name} 
                    hash={blocks[i].hash}
                    prevHash={blocks[i].prevHash}
                    data={blocks[i].data}
                />
            );
        }
        return result;
    }

    return (
        <>
            <Box className='bc-header'>
                <Typography variant='h5' className='txt-bc-header'>Block Chain</Typography>
            </Box>
            {showBlockChain(blocks)}
        </>

    )
}

export default BlockChain;