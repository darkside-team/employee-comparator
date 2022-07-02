const createReactClass = require('create-react-class');

const indicatorMap = new Map();

indicatorMap.set('performanceCurrValue', 'Производительность');
indicatorMap.set('qualityCurrValue', 'Качество');
indicatorMap.set('efficiencyCurrValue', 'Эффективность');
indicatorMap.set('performancePrevValue', 'Производительность (за прошлый период)');
indicatorMap.set('qualityPrevValue', 'Качество  (за прошлый период)');
indicatorMap.set('efficiencyPrevValue', 'Эффективность  (за прошлый период)');
indicatorMap.set('avgTaskCount', 'Среднее кол-во задач за период');
indicatorMap.set('avgTaskComplexity', 'Средняя сложность задач за период');
indicatorMap.set('umkIndicator1', 'Знание принципов актуальности и полноты текста');
indicatorMap.set('umkIndicator2', 'Умение оценивать трудоемкость и сложность задач');
indicatorMap.set('umkIndicator3', 'Знание текстового редактора  Word');
indicatorMap.set('umkIndicator4', 'Знание Java');
indicatorMap.set('umkIndicator5', 'Знание JavaScript + React');
indicatorMap.set('umkIndicator6', 'Знание шаблонов проектирования');
indicatorMap.set('umkIndicator7', 'Знание BPMN');
indicatorMap.set('umkIndicator8', 'Знание UML');
indicatorMap.set('umkIndicator9', 'Работа с требованиями с применением метологии системного анализа');

const IndicatorMap = createReactClass({
  statics: {

    getIndicatorName(code) {
       return indicatorMap.get(code);
    }
  },
  render() {
    return <></>
  },
});

export default IndicatorMap;