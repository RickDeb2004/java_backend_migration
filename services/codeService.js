// services/codeService.js

const axios = require('axios');
const questionService = require('./questionService');
require('dotenv').config();

class CodeService {
  constructor() {
    this.livyUrl = process.env.LIVY_URL;
  }

  async executeCode(codeDTO) {
    try {
      let sessionId = await this.getAvailableSessionId();
      if (!sessionId) {
        sessionId = await this.createNewSession();
        await this.waitForSessionToStart(sessionId);
      }

      const question = await questionService.findById(codeDTO.questionId);
      if (question) {
        const inputFiles = question.inputFiles.map(file => file.path).join(',');
        codeDTO.code += `\ndataset = spark.read.csv('${inputFiles}', header='true')\nspark_etl(dataset)`;
      }

      const statement = {
        code: codeDTO.code,
        kind: codeDTO.codeLanguage
      };
      const codeExecutionURL = `${this.livyUrl}/sessions/${sessionId}/statements`;
      console.log(`execute-code-url: ${codeExecutionURL}`, statement);

      const response = await axios.post(codeExecutionURL, statement);
      return await this.getCodeOutput(sessionId, response.data.id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAvailableSessionId() {
    try {
      const url = `${this.livyUrl}/sessions`;
      console.log(`get-available-sessions: ${url}`);

      const response = await axios.get(url);
      const sessions = response.data.sessions || [];
      for (let session of sessions) {
        if (session.state.toLowerCase() === 'idle') {
          return session.id;
        }
      }
      return null;
    } catch (error) {
      throw new Error(`Error while fetching sessions: ${error}`);
    }
  }

  async createNewSession() {
    try {
      const url = `${this.livyUrl}/sessions`;
      console.log(`create-new-session: ${url}`);

      const newSessionRequest = {
        driverCores: 1,
        driverMemory: '512M',
        executorCores: 1,
        executorMemory: '512M',
        numExecutors: 1
      };

      const response = await axios.post(url, newSessionRequest);
      return response.data.id;
    } catch (error) {
      throw new Error(`Error while creating-new-session: ${error}`);
    }
  }

  async waitForSessionToStart(sessionId) {
    try {
      const url = `${this.livyUrl}/sessions/${sessionId}/state`;
      console.log(`wait-for-session-to-start: ${url}`);

      let sessionState = '';
      for (let i = 0; i < 10; i++) {
        const response = await axios.get(url);
        sessionState = response.data.state.toLowerCase();
        if (sessionState === 'idle') {
          return sessionId;
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      throw new Error('Session did not start');
    } catch (error) {
      throw new Error(`Error while waiting for session to start: ${error}`);
    }
  }

  async getCodeOutput(sessionId, statementId) {
    try {
      const url = `${this.livyUrl}/sessions/${sessionId}/statements/${statementId}`;
      console.log(`get-code-output-url: ${url}`);

      let outputState = '';
      for (let i = 0; i < 4; i++) {
        const response = await axios.get(url);
        outputState = response.data.state.toLowerCase();
        if (outputState === 'available') {
          return response.data.output;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      throw new Error('Code output not available');
    } catch (error) {
      throw new Error(`Error while fetching response: ${error}`);
    }
  }
}

module.exports = new CodeService();
