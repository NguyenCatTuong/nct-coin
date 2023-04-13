import { Card, CardActionArea, CardActions, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material";
import { COLORS } from "../../constants/colors";
import './Block.css'
import { Icon } from '@iconify/react';

function Block(props) {
    const { data, hash, prevHash, name } = props;

    return (
        <>
            <Icon icon="ic:baseline-double-arrow" rotate={3} />
            <Card className="block" style={{ width: '100%' }}>
                <CardActionArea>
                    <CardContent className="card-content">
                        <Typography variant="h6">
                            {name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <List className="list-block">
                        <ListItem
                            className="list-item"
                            secondaryAction={<ListItemText primary={data} />}
                        >
                            <ListItemText primary={'Message'} />
                        </ListItem>
                        <ListItem
                            className="list-item"
                            secondaryAction={<ListItemText primary={hash} />}
                        >
                            <ListItemText primary={'Hash'} />
                        </ListItem>
                        <ListItem
                            className="list-item"
                            secondaryAction={<ListItemText primary={prevHash} />}
                        >
                            <ListItemText primary={'Previous hash'} />
                        </ListItem>
                    </List>
                </CardActions>
            </Card>
        </>

    )
}

export default Block;