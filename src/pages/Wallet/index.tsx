import { Box, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface WalletPageProps { }

interface PieWalletChartProps {
    name: string
    value: number
    id: string
}

const WalletPage: FC<WalletPageProps> = () => {
    const [fix, setFix] = useState<number>(60)
    const [action, setAction] = useState<number>(20)
    const [fii, setFii] = useState<number>(20)
    const [cripto, setCripto] = useState<number>(0)
    const [dataChart, setDataChart] = useState<PieWalletChartProps[]>([])

    const onChangeValue = (field: string, value: number) => {
        if (cannotChange(field, value) === false) {
            return
        }

        let newDataChart = dataChart.map((el) => {
            if (el.id === field) {
                el.value = value
            }

            return el
        })

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

        saveLocalStorage(field, value)
        setDataChart(newDataChart)
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

        return (fixValue + actionValue + fiiValue + criptoValue) <= 100
    }

    const mountLocalStorageKey = (key: string): string => {
        return `option-${key}`
    }

    const saveLocalStorage = (field: string, value: number) => {
        localStorage.setItem(mountLocalStorageKey(field), value.toString())
    }

    const readLocalStorage = (field: string): number => {
        let value = localStorage.getItem(mountLocalStorageKey(field))

        if (value !== null) {
            return parseFloat(value)
        }

        return 0
    }

    useEffect(() => {
        let fixValue = readLocalStorage('fix')
        let fiiValue = readLocalStorage('fii')
        let actionValue = readLocalStorage('action')
        let criptoValue = readLocalStorage('cripto')

        setFix(fixValue)
        setFii(fiiValue)
        setAction(actionValue)
        setCripto(criptoValue)

        setDataChart([
            { name: 'Renda Fixa', value: fixValue, id: 'fix' },
            { name: 'FII', value: fiiValue, id: 'fii' },
            { name: 'Ações', value: actionValue, id: 'action' },
            { name: 'Criptomoeda', value: criptoValue, id: 'cripto' },
        ])
    }, [])

    return (
        <Flex>
            <Box mx={16} w="96">
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
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={dataChart}
                    fill="#8884d8"
                    label
                />
                <Tooltip />
            </PieChart>
        </Flex>
    )
}

export default WalletPage
