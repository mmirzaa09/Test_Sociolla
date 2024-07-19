import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { alphabetData, brandList, listImageBrand } from './assets/json';
import { images } from './assets/images/image';

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headContent: {
        backgroundColor: 'white',
    },
    imageContainer: {
        width: 150,
        height: 70,
        resizeMode: 'cover',
        margin: 10,
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 3,
    },
    tabContent: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

const Index = () => {
    const [listImage, setListImage] = useState();
    const [tabCurrent, setTabCurrent] = useState(1);
    const [alphabetCurrent, setAlphabetCurrent] = useState();
    const [brandListState, setBrandListState] = useState([]);
    const [onSearchItem, setOnSearchItem] = useState('')
    const [menuTab, setMenuTab] = useState([
        {
            id: 1,
            title: 'BRAND NAME'
        },
        {
            id: 2,
            title: 'BRAND ORIGINS'
        }
    ])

    useEffect(() => {
        setListImage(listImageBrand);
        setBrandListState(brandList);
    }, []);

    const listBrandImage = () => {
        const renderImage = (item) => (
            <Image source={item} style={styles.imageContainer}/>
        );

        return (
            <FlatList
                data={listImage}
                renderItem={({item}) => renderImage(item.image)}
                keyExtractor={item => item.id}
                horizontal
            />
        );
    };

    const tabMenu = () => {
        let menu = menuTab.map((item, index) => {
            let label
            let style

            style = { borderBottomWidth: 2, flex: 1, alignItems: 'center', borderColor: '#c7c3c5' }
            label = { fontWeight: 'bold', fontSize: 14, color: '#c7c3c5', letterSpacing: 2 }

            if (item.id === tabCurrent) {
                style = { ...style,  borderColor: '#e85374'}
                label = { ...label, color: 'black'}
            }

            return (
                <TouchableOpacity style={style} onPress={() => {setTabCurrent(item.id)}}>
                    <Text style={label} key={index}>{item.title}</Text>
                </TouchableOpacity>
            )
        });

        return menu;
    }

    const searchMenu = () => (
        <View style={{ marginTop: 16, width: '100%', borderWidth: 0.5, borderColor: '#dedddf', borderRadius: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                <Image source={images.search} style={{ width: 24, height: 24, tintColor: '#dedddf' }}/>
                <TextInput 
                    placeholder='Search Brand Name...'
                    value={onSearchItem}
                    onChangeText={setOnSearchItem}
                />
            </View>
        </View>
    );

    const alphabetMenu = () => {
        const containerMenu = (item) => {
            let style = { width: 24, height: 24, marginHorizontal: 1, alignItems: 'center', justifyContent: 'center' };
            let label = {color: 'black', fontWeight: '600'};
            if (item.letter === alphabetCurrent) {
                style = {...style, backgroundColor: '#f5a5c4', borderRadius: 100}
                label = {...label, color: 'white'}
            }
            return (
                <TouchableOpacity style={style} onPress={() => {setAlphabetCurrent(item.letter)}}>
                    <Text style={label}>{item.letter}</Text>
                </TouchableOpacity>
            )
        } 
        
        return (
            <View>
                <FlatList
                    data={alphabetData}
                    horizontal
                    renderItem={({item}) => containerMenu(item)}
                />
            </View>
        )
    };

    const getFilteredData = (letter, search) => {
        return brandList.filter(item => {
          const matchesLetter = !letter || item.brand.startsWith(letter);
          const matchesSearch = item.brand.toLowerCase().includes(search.toLowerCase());
          return matchesLetter && matchesSearch;
        });
      };

    const filteredData = getFilteredData(alphabetCurrent, onSearchItem)
    
    const brandListMenu = () => {
        const containerBrand = (brand) => (
            <View style={{ padding: 10, borderBottomWidth: 0.5 }}>
                <Text style={{ color: 'black', letterSpacing: 2 }}>{brand}</Text>
            </View>
        )
        
        return (
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => containerBrand(item.brand)}
            />
        )
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.headContent}>
                <Text  style={{ fontWeight: 'bold', color: 'black', letterSpacing: 2, paddingHorizontal: 16, paddingTop: 16 }}>FEATURE BRAND</Text>
                {listBrandImage()}
            </View>
            <View style={styles.tabContent}>
                {tabMenu()}
            </View>
            <View style={{ paddingHorizontal: 16 }}>
                {searchMenu()}
            </View>
            <View style={{ marginTop: 10, borderTopWidth: 0.5, borderBottomWidth: 0.5, padding: 10 }}>
                {alphabetMenu()}
            </View>

            {brandListMenu()}
        </View>
    )
}

export default Index