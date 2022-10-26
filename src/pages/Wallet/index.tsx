import { Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import { FC, useState } from "react";

interface WalletPageProps {}

const WalletPage: FC<WalletPageProps> = () => {
    const [fix, setFix] = useState<number>(60)
    const [action, setAction] = useState<number>(20)
    const [fii, setFii] = useState<number>(20)
    const [cripto, setCripto] = useState<number>(0)
    const [max ,setMax] = useState<number>(100)

    const onChangeValue = (field: string, value: number) => {
        console.log(value);
        console.log(cannotChange(field, value));
        if (cannotChange(field, value) === false) {
            return
        }

        switch (field) {
            case 'fix':
                setFix(value)
                break;
            case 'action':
                setAction(value)
                break;
            case 'fii':
                setFii(value)
                break;
            case 'cripto':
                setCripto(value)
                break;
        }

        setMax(fix + cripto + action + fii)
    }

    const cannotChange = (field: string, value: number) => {
        let fixValue = fix
        let fiiValue = fii
        let actionValue = action
        let criptoValue = cripto

        switch (field) {
            case 'fix':
                fixValue = value
                break;
            case 'action':
                actionValue = value
                break;
            case 'fii':
                fiiValue = value
                break;
            case 'cripto':
                criptoValue = value
                break;
        }
        console.log(fixValue + actionValue + fiiValue + criptoValue);
        
        return (fixValue + actionValue + fiiValue + criptoValue) <= 100
    }

    return (
        <Box mx={16}>
            <Text fontSize={'2xl'} mb={8}>Carteira</Text>
            <Text fontSize={'xl'}>Renda Fixa</Text>
            <Slider aria-label='slider-ex-1' 
                defaultValue={60}
                value={fix}
                onChange={(val) => onChangeValue('fix', val)}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
            <Text fontSize={'xl'}>Ações Nacionais</Text>
            <Slider aria-label='slider-ex-1' 
                defaultValue={20}
                value={action}
                onChange={(val) => onChangeValue('action', val)}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
            <Text fontSize={'xl'}>FII</Text>
            <Slider aria-label='slider-ex-1'
                defaultValue={20}
                value={fii}
                onChange={(val) => onChangeValue('fii', val)}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
            <Text fontSize={'xl'}>Criptomoedas</Text>
            <Slider aria-label='slider-ex-1' 
                defaultValue={0}
                value={cripto}
                onChange={(val) => onChangeValue('cripto', val)}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
        </Box>
    )
}

export default WalletPage
