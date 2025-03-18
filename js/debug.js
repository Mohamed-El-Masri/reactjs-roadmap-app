// React Learning Progress Tracker - Debug Helper Module

// Setup debug console
document.addEventListener('DOMContentLoaded', function() {
    setupDebugConsole();
});

// Create a debug console for development
function setupDebugConsole() {
    // Only run in development mode
    if (window.location.hostname !== "127.0.0.1" && window.location.hostname !== "localhost") {
        return;
    }
    
    const debugContainer = document.createElement('div');
    debugContainer.id = 'debugConsole';
    debugContainer.className = 'debug-console';
    debugContainer.innerHTML = `
        <div class="debug-header">
            <h4>
                <i class="fas fa-bug me-2"></i>
                <span>وحدة التصحيح</span>
            </h4>
            <button class="btn btn-sm btn-outline-secondary toggle-btn">
                <i class="fas fa-chevron-down"></i>
            </button>
        </div>
        <div class="debug-body">
            <div class="debug-logs" id="debugLogs"></div>
            <div class="debug-actions mt-2">
                <button class="btn btn-sm btn-outline-danger me-1" id="debugClearStorageBtn">
                    حذف LocalStorage
                </button>
                <button class="btn btn-sm btn-outline-warning me-1" id="debugCheckIntegrityBtn">
                    فحص تكامل البيانات
                </button>
                <button class="btn btn-sm btn-outline-info" id="debugExportLogsBtn">
                    تصدير السجلات
                </button>
            </div>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .debug-console {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 350px;
            background-color: rgba(0, 0, 0, 0.8);
            border-radius: 8px;
            color: #fff;
            z-index: 9999;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            font-family: monospace;
            font-size: 12px;
        }
        
        .debug-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 15px;
            border-bottom: 1px solid #444;
        }
        
        .debug-header h4 {
            margin: 0;
            font-size: 14px;
            color: #61dafb;
        }
        
        .debug-body {
            max-height: 300px;
            overflow-y: auto;
            padding: 10px;
        }
        
        .debug-logs {
            margin-bottom: 10px;
        }
        
        .debug-log-entry {
            padding: 5px 0;
            border-bottom: 1px dashed #444;
            white-space: pre-wrap;
            direction: ltr;
            text-align: left;
        }
        
        .log-error { color: #ff6b6b; }
        .log-warn { color: #feca57; }
        .log-info { color: #1dd1a1; }
        .log-debug { color: #54a0ff; }
        
        .collapsed .debug-body {
            display: none;
        }
    `;
    document.head.appendChild(style);
    
    // Add to document
    document.body.appendChild(debugContainer);
    
    // Setup toggle functionality
    const toggleBtn = debugContainer.querySelector('.toggle-btn');
    toggleBtn.addEventListener('click', () => {
        debugContainer.classList.toggle('collapsed');
        toggleBtn.innerHTML = debugContainer.classList.contains('collapsed') ? 
            '<i class="fas fa-chevron-up"></i>' : 
            '<i class="fas fa-chevron-down"></i>';
    });
    
    // Add button event handlers
    document.getElementById('debugClearStorageBtn').addEventListener('click', () => {
        if (confirm('هل أنت متأكد من رغبتك في حذف جميع البيانات؟')) {
            localStorage.clear();
            addLogMessage('تم حذف localStorage بنجاح', 'info');
            setTimeout(() => window.location.reload(), 1000);
        }
    });
    
    document.getElementById('debugCheckIntegrityBtn').addEventListener('click', () => {
        if (window.validateDataIntegrity) {
            window.validateDataIntegrity();
            addLogMessage('تم التحقق من تكامل البيانات', 'info');
        } else {
            addLogMessage('دالة validateDataIntegrity غير متوفرة', 'error');
        }
    });
    
    document.getElementById('debugExportLogsBtn').addEventListener('click', exportDebugLogs);
    
    // Override console logging
    overrideConsoleLogging();
    
    // Log initial information
    addLogMessage('وحدة التصحيح جاهزة', 'info');
    addLogMessage(`وقت التحميل: ${new Date().toISOString()}`, 'debug');
    addLogMessage(`localStorage المستخدم: ${formatBytes(calculateLocalStorageSize())}`, 'debug');
}

// Add a log message to the debug console
function addLogMessage(message, type = 'debug') {
    const debugLogs = document.getElementById('debugLogs');
    if (!debugLogs) return;
    
    const logEntry = document.createElement('div');
    logEntry.className = `debug-log-entry log-${type}`;
    
    const timestamp = new Date().toLocaleTimeString();
    logEntry.textContent = `[${timestamp}] ${message}`;
    
    debugLogs.appendChild(logEntry);
    debugLogs.scrollTop = debugLogs.scrollHeight;
}

// Override console logging to capture in debug console
function overrideConsoleLogging() {
    const originalConsole = {
        log: console.log,
        warn: console.warn,
        error: console.error,
        info: console.info
    };
    
    console.log = function() {
        originalConsole.log.apply(console, arguments);
        addLogMessage(formatConsoleArgs(arguments), 'debug');
    };
    
    console.warn = function() {
        originalConsole.warn.apply(console, arguments);
        addLogMessage(formatConsoleArgs(arguments), 'warn');
    };
    
    console.error = function() {
        originalConsole.error.apply(console, arguments);
        addLogMessage(formatConsoleArgs(arguments), 'error');
    };
    
    console.info = function() {
        originalConsole.info.apply(console, arguments);
        addLogMessage(formatConsoleArgs(arguments), 'info');
    };
}

// Format console arguments for display
function formatConsoleArgs(args) {
    return Array.from(args).map(arg => {
        if (typeof arg === 'object') {
            try {
                return JSON.stringify(arg);
            } catch (e) {
                return String(arg);
            }
        }
        return String(arg);
    }).join(' ');
}

// Calculate localStorage size
function calculateLocalStorageSize() {
    let size = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            size += localStorage[key].length * 2; // UTF-16 characters are 2 bytes each
        }
    }
    return size;
}

// Format bytes to human-readable size
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Export debug logs
function exportDebugLogs() {
    const debugLogs = document.getElementById('debugLogs');
    if (!debugLogs) return;
    
    const logs = Array.from(debugLogs.children).map(node => node.textContent).join('\n');
    const blob = new Blob([logs], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debug-logs-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    addLogMessage('تم تصدير السجلات', 'info');
}

// Add debug tools to global scope
window.debugTools = {
    addLogMessage,
    calculateLocalStorageSize,
    exportDebugLogs
};
