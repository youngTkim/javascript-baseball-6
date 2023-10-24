import { Random, Console } from "@woowacourse/mission-utils";

class App {
  constructor() {}
  async play() {
    try {
      Console.print("숫자 야구를 게임을 시작합니다.");
      let computer = await this.pickNumber();
      // Console.print(computer); // computer의 숫자배열 확인용
      this.question(computer);
    } catch (e) {
      Console.print("[ERROR]");
    }
  }

  async pickNumber() {
    let arr = [(await Random.pickNumberInRange(1, 9)) + ""];
    while (arr.length < 3) {
      const randomNumber = (await Random.pickNumberInRange(0, 9)) + "";
      if (!arr.includes(randomNumber)) {
        arr.push(randomNumber);
      }
    }
    return arr;
  }

  async question(computerArr) {
    try {
      const read = await Console.readLineAsync("숫자를 입력해주세요 : ");
      const inputArr = String(read).split("");
      if (inputArr.length !== 3) {
        throw new Error();
      } else {
        let set = [...new Set(inputArr)];
        if (set.length !== 3) {
          throw new Error();
        } else {
          let regex = /^[0-9]+$/;
          if (set.find((x) => !regex.test(x))) {
            throw new Error();
          }
        }
      }
      let result = this.inspect(computerArr, inputArr);
      Console.print(result.LINE);
      if (!result.gameover) {
        return this.question(computerArr);
      } else {
        return this.AskRegame();
      }
    } catch (e) {
      Console.print("[ERROR]");
    }
  }

  inspect(targetArr, inputArr) {
    let BALL = 0;
    let STRIKE = 0;
    let LINE = "낫싱";
    let GAMEOVER = false;
    for (let i = 0; i < 3; i++) {
      if (targetArr.includes(inputArr[i])) {
        if (targetArr[i] === inputArr[i]) {
          STRIKE++;
        } else {
          BALL++;
        }
      }
    }

    if (BALL || STRIKE) {
      if (STRIKE === 3) {
        LINE = "3스트라이크\n3개의 숫자를 모두 맞히셨습니다! 게임 종료";
        gameover = true;
      } else {
        LINE = `${BALL ? `${BALL}볼 ` : ""}${
          STRIKE ? `${STRIKE}스트라이크` : ""
        }`;
      }
    }

    return { BALL, STRIKE, LINE, GAMEOVER };
  }

  async AskRegame() {
    try {
      const isExit = await Console.readLineAsync(
        "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요. "
      );
      Console.print(isExit);
      if (isExit === "1" || isExit === "2") {
        if (isExit === "1") {
          let newComputerArr = await this.pickNumber();
          // Console.print(newComputerArr); // computer의 숫자배열 확인용
          return this.question(newComputerArr);
        }
        if (isExit === "2") return;
      } else {
        throw new Error();
      }
    } catch (e) {
      Console.print("[ERROR]");
    }
  }
}

new App().play();

export default App;

// play()할 때에
