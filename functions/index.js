const functions = require("firebase-functions");
const next = require("next");
const express = require("express");

const app = next({
    dev: false,
    conf: { distDir: ".next" },
});

const handle = app.getRequestHandler();

exports.nextApp = functions.https.onRequest(async (req, res) => {
    await app.prepare();
    handle(req, res);
});
