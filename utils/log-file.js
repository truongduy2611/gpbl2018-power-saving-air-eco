const fs = require('fs');

const temp_sensor_filename = "./logs/temp-sensor-logs.txt";
const motion_sensor_filename = "./logs/motion-sensor-logs.txt";
const people_filename = "./logs/number-of-people-logs.txt";

const calculateNumberOfPeople = (data) => {
    try {
        // const data = result.slice(result.length - 4, result.length);
        if (data[0].id === '1' && data[0].data === '1') {
            if (data[1].id === '1' && data[0].data === '0') {
                if (data[2].id === '2' && data[0].data === '1') {
                    if (data[3].id === '2' && data[0].data === '0') {
                        console.log('in')
                        return 1;
                    }
                }
            }
        }
        if (data[0].id === '2' && data[0].data === '1') {
            if (data[1].id === '2' && data[0].data === '0') {
                if (data[2].id === '1' && data[0].data === '1') {
                    if (data[3].id === '1' && data[0].data === '0') {
                        console.log('out')
                        return -1;
                    }
                }
            }
        }
    } catch (error) {
        console.log('error')
        return 0;
    }

    return 0;
}

const getNoOfPeopleFromFile = () => {
    try {
        // const prevData = JSON.parse(fs.readFileSync(people_filename).toString());
        console.log('here')
        const prevData = JSON.parse(fs.readFileSync(motion_sensor_filename).toString());
        console.log(prevData.length)
        let count = 0;
        for (let i = 0; i < prevData.length ; i = i + 4) {
            console.log(i)
            count = count + calculateNumberOfPeople(prevData.slice(i, i + 4))

        }
        console.log('count',count)
        return count;

    } catch (error) {
        console.log('count error')
        console.log(error)
        fs.writeFileSync(people_filename, JSON.stringify({noOfPeople: 0}), 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }
    return 0;
}

const WriteSensorLog = async (data, filename) => {
    try {
        const prevData = JSON.parse(fs.readFileSync(filename).toString());
        const result = [...prevData, data];
        // if (filename === motion_sensor_filename && result.length % 4) {
        //    const noOfPeople = await getNoOfPeopleFromFile();
        //    const noOfPeopleNow = noOfPeople + calculateNumberOfPeople(result.slice(result.length - 4, result.length));
        //    console.log(noOfPeopleNow);
        // }
        fs.writeFileSync(filename, JSON.stringify(result), 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
        });
    } catch (error) {
        fs.writeFileSync(filename, JSON.stringify([data]), 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }
}

const ReadSensorLog = (filename) => {
    try {
        const data = JSON.parse(fs.readFileSync(filename).toString());
        return data;
    } catch (error) {
        return [];
    }
}

module.exports = {
    temp_sensor_filename,
    motion_sensor_filename,
    WriteSensorLog,
    ReadSensorLog,
    calculateNumberOfPeople,
    getNoOfPeopleFromFile
}