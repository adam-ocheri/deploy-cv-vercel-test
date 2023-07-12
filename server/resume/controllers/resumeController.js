"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deleteResume = exports.updateResume = exports.createResume = exports.getResumes = void 0;
var express_async_handler_1 = require("express-async-handler");
var resumeModels_1 = require("../models/resumeModels");
var zod_1 = require("zod");
var resumeValidator_1 = require("../utilities/resumeValidator");
// @desc    Get resumes
// @route   GET /api/resumes
// @access  Private
exports.getResumes = (0, express_async_handler_1["default"])(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resumes, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, resumeModels_1.Resume.find({})];
            case 1:
                resumes = _a.sent();
                res.status(200).json({ resumes: resumes });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                if (error_1 instanceof zod_1.ZodError) {
                    res.status(400).json({ message: error_1.issues.map(function (issue) { return issue.message; }).join(', ') });
                }
                else {
                    res.status(500).json({ message: 'Something went wrong' });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// @desc    Create resume
// @route   POST /api/resumes
// @access  Private
exports.createResume = (0, express_async_handler_1["default"])(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                result = resumeValidator_1.ResumeValidator.parse(req.body);
                return [4 /*yield*/, resumeModels_1.Resume.create(result)];
            case 1:
                _a.sent();
                res.status(201).json(result);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                if (error_2 instanceof zod_1.ZodError) {
                    res.status(400).json({ message: error_2.issues.map(function (issue) { return issue.message; }).join(', ') });
                }
                else {
                    res.status(500).json({ message: 'Something went wrong' });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
exports.updateResume = (0, express_async_handler_1["default"])(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resume, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, resumeModels_1.Resume.findByIdAndUpdate(req.params.id, req.body, { "new": true })];
            case 1:
                resume = _a.sent();
                if (!resume) {
                    res.status(404).json({ message: 'Resume not found' });
                    return [2 /*return*/];
                }
                res.status(200).json({ resume: resume });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                if (error_3 instanceof zod_1.ZodError) {
                    res.status(400).json({ message: error_3.issues.map(function (issue) { return issue.message; }).join(', ') });
                }
                else {
                    res.status(500).json({ message: 'Something went wrong' });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
exports.deleteResume = (0, express_async_handler_1["default"])(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resume, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, resumeModels_1.Resume.findById(req.params.id)];
            case 1:
                resume = _a.sent();
                if (!resume) {
                    res.status(401).json({ message: 'Resume not found' });
                }
                return [4 /*yield*/, (resume === null || resume === void 0 ? void 0 : resume.deleteOne())];
            case 2:
                _a.sent();
                res.status(200).json({ message: "deleted resume #".concat(req.params.id, " successfully") });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                if (error_4 instanceof zod_1.ZodError) {
                    res.status(400).json({ message: error_4.issues.map(function (issue) { return issue.message; }).join(', ') });
                }
                else {
                    res.status(500).json({ message: 'Something went wrong' });
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
