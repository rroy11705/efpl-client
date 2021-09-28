import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import React from 'react';
import PlayerListItem from './PlayerListItem';

import { useRecoilValue } from 'recoil';
import { filteredPlayers } from '../atoms/Players';
import Filters from './Filters';

const PlayerList = () => {

    const player = useRecoilValue(allPlayerState);

    return (
        <>
            <Filters />
            <BottomSheetFlatList
                data={player}
                renderItem={({ item }) => <PlayerListItem key={item.id} player={item} />}
            />
        </>
    )
}

export default PlayerList
